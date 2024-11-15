const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');
const passwordHashService = require('../services/passwordHashService');
const { Op } = require('sequelize');

exports.findAll = () => {
    return Usuario.findAll({
        include: [
            {
                model: Perfil,
                as: "perfis",
            },
        ],
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

exports.findByEmail = (login) => {
    if (!login.email) {
        return Promise.resolve(null);
    }
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
    let senha = passwordHashService.genPasswordHash(usuario?.senha);
    if (senha) {
        usuario.senha = senha;
    }
    return Usuario.create(usuario).then(usuarioCriado => {
        if (Array.isArray(usuario?.perfis)) {
            usuario.perfis.forEach(perfil => {
                usuarioCriado.addPerfis(perfil?.perfilId);
            });
        }
        return usuarioCriado;
    });
};

exports.update = (usuario, id) => {
    let senha = passwordHashService.genPasswordHash(usuario?.senha);
    if (senha) {
        usuario.senha = senha;
    }
    return this.findById(id).then(usuarioAtual => {
        if (!usuarioAtual) {
            return null;
        }
        usuarioAtual.set(usuario);
        if (Array.isArray(usuario?.perfis)) {
            let perfis = [];
            usuario.perfis.forEach(perfil => {
                perfis.push(perfil?.perfilId);
            });
            usuarioAtual.setPerfis(perfis);
        }
        return usuarioAtual.save({
            fields: [
                "nome",
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
    })
};