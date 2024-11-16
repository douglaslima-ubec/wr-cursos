const Perfil = require('../models/perfil');

exports.findAll = () => {
    return Perfil.findAll();
};

exports.findById = (id) => {
    return Perfil.findByPk(id);
};

exports.insert = (perfil) => {
    return Perfil.create(perfil);
};

exports.update = (perfil, id) => {
    return this.findById(id).then(perfilAtual => {
        if (!perfilAtual) {
            return null;
        }
        perfilAtual.set(perfil);
        return perfilAtual.save({
            fields: [
                "nome",
                "descricao",
            ],
        });
    });
};

exports.delete = (id) => {
    return this.findById(id).then(async perfil => {
        if (!perfil) {
            return null;
        }
        await perfil.setUsuarios([]);
        return perfil.destroy({
            force: true,
        });
    });
};