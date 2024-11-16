const Curso = require('../models/curso');
const Instrutor = require('../models/instrutor');
const Tema = require('../models/tema');

exports.findAll = () => {
    return Curso.findAll({
        include: [
            {
                model: Instrutor,
                as: "instrutores",
            },
            {
                model: Tema,
                as: "temas",
            },
        ],
    })
};

exports.findById = (id) => {
    return Curso.findByPk(id, {
        include: [
            {
                model: Instrutor,
                as: "instrutores",
            },
            {
                model: Tema,
                as: "temas",
            },
        ],
    })
};

exports.insert = (curso) => {
    return Curso.create(curso).then(async cursoCriado => {
        if (Array.isArray(curso?.instrutores)) {
            let instrutores = [];
            curso.instrutores.forEach(instrutor => {
                instrutores.push(instrutor?.instrutorId);
            });
            await cursoCriado.setInstrutores(instrutores);
        }
        if (Array.isArray(curso?.temas)) {
            let temas = [];
            curso.temas.forEach(tema => {
                temas.push(tema?.temaId);
            });
            await cursoCriado.setTemas(temas);
        }
        return this.findById(cursoCriado.getDataValue("cursoId"));
    });
};

exports.update = (curso, id) => {
    return this.findById(id).then(async cursoAtual => {
        if (!cursoAtual) {
            return null;
        }
        cursoAtual.set(curso);
        if (Array.isArray(curso?.instrutores)) {
            let instrutores = [];
            curso.instrutores.forEach(instrutor => {
                instrutores.push(instrutor?.instrutorId);
            });
            await cursoAtual.setInstrutores(instrutores);
        }
        if (Array.isArray(curso?.temas)) {
            let temas = [];
            curso.temas.forEach(tema => {
                temas.push(tema?.temaId);
            });
            await cursoAtual.setTemas(temas);
        }
        cursoAtual.save({
            fields: [
                "nome",
                "descricao",
                "cargaHoraria",
                "preco",
                "modalidade",
                "estaPublicado",
            ],
        });
        return this.findById(cursoAtual.getDataValue("cursoId"));
    });
};

exports.delete = (id) => {
    return this.findById(id).then(async curso => {
        if (!curso) {
            return null;
        }
        await curso.setInstrutores([]);
        await curso.setTemas([]);
        return curso.destroy({
            force: true,
        });
    });
};