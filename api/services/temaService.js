const Tema = require('../models/tema');

exports.findAll = () => {
    return Tema.findAll();
};

exports.findById = (id) => {
    return Tema.findByPk(id);
};

exports.insert = (tema) => {
    return Tema.create(tema);
};

exports.update = (tema, id) => {
    return this.findById(id).then(temaAtual => {
        if (!temaAtual) {
            return null;
        }
        temaAtual.set(tema);
        return temaAtual.save({
            fields: [
                "nome",
                "descricao",
            ],
        });
    });
};

exports.delete = (id) => {
    return this.findById(id).then(async tema => {
        if (!tema) {
            return null;
        }
        await tema.setCursos([]);
        return tema.destroy({
            force: true,
        });
    });
};