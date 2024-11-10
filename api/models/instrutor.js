const { DataTypes } = require('sequelize');
const database = require('../db/config');

const Instrutor = database.define(
    'Instrutor',
    {
        instrutorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "instrutor_id",
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descricao: DataTypes.STRING,
    },
    {
        tableName: "tb_instrutor",
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    }
);

module.exports = Instrutor;