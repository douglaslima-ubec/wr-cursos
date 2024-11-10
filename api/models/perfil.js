const { DataTypes } = require('sequelize');
const database = require('../db/config');

const Perfil = database.define(
    'Perfil',
    {
        perfilId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "perfil_id",
        },
        nome: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descricao: DataTypes.STRING,
    },
    {
        tableName: "tb_perfil",
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    }
);

module.exports = Perfil;