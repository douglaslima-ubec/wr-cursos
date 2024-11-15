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
    return Curso.create(curso).then(cursoCriado => {
        if (Array.isArray(curso?.instrutores)) {
            curso.instrutores.forEach(instrutor => {
                cursoCriado.addInstrutores(instrutor?.instrutorId);
            });
        }
        if (Array.isArray(curso?.temas)) {
            curso.temas.forEach(tema => {
                cursoCriado.addTemas(tema?.temaId);
            });
        }
        return cursoCriado;
    });
};

exports.update = (curso, id) => {
    return this.findById(id).then(cursoAtual => {
        if (!cursoAtual) {
            return null;
        }
        cursoAtual.set(curso);
        if (Array.isArray(curso?.instrutores)) {
            let instrutores = [];
            curso.instrutores.forEach(instrutor => {
                instrutores.push(instrutor?.instrutorId);
            });
            cursoAtual.setInstrutores(instrutores);
        }
        if (Array.isArray(curso?.temas)) {
            let temas = [];
            curso.temas.forEach(tema => {
                temas.push(tema?.temaId);
            });
            cursoAtual.setTemas(temas);
        }
        return cursoAtual.save({
            fields: [
                "nome",
                "descricao",
                "cargaHoraria",
                "preco",
                "modalidade",
                "estaPublicado",
            ],
        });
    });
};