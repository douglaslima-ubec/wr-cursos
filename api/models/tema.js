const { DataTypes } = require('sequelize');
const database = require('../db/config');

const Tema = database.define(
    'Tema',
    {
        temaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "tema_id",
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descricao: DataTypes.STRING,
    },
    {
        tableName: "tb_tema",
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    }
);

module.exports = Tema;