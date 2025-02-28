const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');
const passwordService = require('../services/passwordService');
const { Op } = require('sequelize');

exports.findAll = () => {
    return Usuario.findAll({
        include: [
            {
                model: Perfil,
                as: "perfis",
            },
        ],
        order: [['nome', 'ASC']],
    });
};

exports.findById = (id) => {
    return Usuario.findByPk(id, {
        include: [
            {
                model: Perfil,
                as: "perfis",
            },
        ],
    });
};

exports.search = (parameters) => {
    return Usuario.findAll({
        include: [
            {
                model: Perfil,
                as: "perfis",
            },
        ],
        where: parameters,
    })
};

exports.findByEmail = (login) => {
    return Usuario.findAll({
        include: {
            model: Perfil,
            as: "perfis",
        },
        where: {
            email: login.email,
        },
    });
};

exports.insert = (usuario) => {
    let senha = passwordService.generatePasswordHash(usuario?.senha);
    if (senha) {
        usuario.senha = senha;
    }
    return Usuario.create(usuario).then(async usuarioCriado => {
        if (Array.isArray(usuario?.perfis)) {
            let perfis = [];
            usuario.perfis.forEach(perfil => {
                perfis.push(perfil?.perfilId);
            });
            await usuarioCriado.setPerfis(perfis);
        }
        return this.findById(usuarioCriado.getDataValue("usuarioId"));
    });
};

exports.update = (usuario, id) => {
    let senha = passwordService.generatePasswordHash(usuario?.senha);
    if (senha) {
        usuario.senha = senha;
    }
    return this.findById(id).then(async usuarioAtual => {
        if (!usuarioAtual) {
            return null;
        }
        usuarioAtual.set(usuario);
        if (Array.isArray(usuario?.perfis)) {
            let perfis = [];
            usuario.perfis.forEach(perfil => {
                perfis.push(perfil?.perfilId);
            });
            await usuarioAtual.setPerfis(perfis);
        }
        await usuarioAtual.save({
            fields: [
                "nome",
                "usuario",
                "telefone",
                "cep",
                "uf",
                "cidade",
                "bairro",
                "rua",
                "email",
                "senha",
                "alterarSenha",
                "expiraEm",
                "estaAtivo",
            ],
        });
        return this.findById(usuarioAtual.getDataValue("usuarioId"));
    });
};

exports.existsByEmail = (email) => {
    return Usuario.count({
        where: {
            email: email,
        }
    }).then(count => {
        if (count == 0) {
            return false;
        }
        return true;
    });
}

exports.existsByUsername = (username) => {
    return Usuario.count({
        where: {
            usuario: username,
        }
    }).then(count => {
        if (count == 0) {
            return false;
        }
        return true;
    });
}