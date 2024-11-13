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
    return Curso.update(curso, {
        fields: [
            "nome",
            "descricao",
            "cargaHoraria",
            "preco",
            "modalidade",
            "estaPublicado",
        ],
        where: {
            cursoId: id,
        },
    }).then(() => {
        return this.findById(id);
    });
}