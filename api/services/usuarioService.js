const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');

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

exports.insert = (usuario) => {
    return Usuario.create(usuario).then(usuarioCriado => {
        if(Array.isArray(usuario?.perfis)) {
            usuario.perfis.forEach(perfil => {
                usuarioCriado.addPerfis(perfil?.perfilId);
            });
        }
        return usuarioCriado;
    });
};

exports.update = (usuario, id) => {
    return Usuario.update(usuario, {
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
        where: {
            usuarioId: id,
        },
    }).then(() => {
        return this.findById(id);
    });
};