const Instrutor = require('../models/instrutor');

exports.findAll = () => {
    return Instrutor.findAll();
};

exports.findById = (id) => {
    return Instrutor.findByPk(id);
};

exports.insert = (instrutor) => {
    return Instrutor.create(instrutor);
};

exports.update = (instrutor, id) => {
    return this.findById(id).then(instrutorAtual => {
        if (!instrutorAtual) {
            return null;
        }
        instrutorAtual.set(instrutor);
        return instrutorAtual.save({
            fields: [
                "nome",
                "descricao",
            ],
        });
    });
};

exports.delete = (id) => {
    return this.findById(id).then(async instrutor => {
        if (!instrutor) {
            return null;
        }
        await instrutor.setCursos([]);
        return instrutor.destroy({
            force: true,
        });
    });
};