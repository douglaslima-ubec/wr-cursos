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