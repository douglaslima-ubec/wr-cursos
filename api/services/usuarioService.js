const Usuario = require('../models/usuario');
const Perfil = require('../models/perfil');
const associations = require('../models/associations');
const { PerfilUsuario } = require('../models/associations');
const { UsuarioPerfil } = require('../models/associations');

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

// Funciona, mas preciso deixar o código mais simples
// Referências:
// - Documentação: https://sequelize.org/docs/v7/associations/belongs-to-many/#defining-the-association
// - Stack Overflow: https://stackoverflow.com/questions/58023937/sequelize-associations-methods-is-not-working
// O método Modelo.add{NomeDoModelo} deve estar no plural ou singular, verificar o atributo "as" definido na associação
exports.insert = async (usuario) => {
    let perfis = [];
    if (usuario.perfis && usuario.perfis.length > 0) {
        for(let perfil of usuario.perfis) {
            perfis.push(await Perfil.findByPk(perfil.perfilId));
        }
    }
    return Usuario.create(usuario).then(usuarioCriado => {
        for (let perfil of perfis) {
            usuarioCriado.addPerfis(perfil);
        }
        return usuarioCriado;
    });
};