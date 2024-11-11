const { DataTypes } = require('sequelize');
const database = require('../db/config');

/**
 * Entidade `Curso` mapeada através da biblioteca **Sequelize**.
 */
const Curso = database.define(
    'Curso',
    {
        cursoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "curso_id",
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cargaHoraria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "carga_horaria",
        },
        preco: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
        },
        modalidade: DataTypes.STRING,
        estaPublicado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "esta_publicado",
        },
        criadoEm: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: "criado_em",
        },
    },
    {
        tableName: "tb_curso",
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    }
);

module.exports = Curso;