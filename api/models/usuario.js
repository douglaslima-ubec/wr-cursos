const { DataTypes } = require('sequelize');
const database = require('../db/config');

/**
 * Entidade `Usuario` mapeada através da biblioteca **Sequelize**.
 */
const Usuario = database.define(
    'Usuario',
    {
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            field: "usuario_id",
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        telefone: DataTypes.STRING(20),
        cep: DataTypes.CHAR(8),
        uf: DataTypes.CHAR(2),
        cidade: DataTypes.STRING,
        bairro: DataTypes.STRING,
        rua: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alterarSenha: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "alterar_senha",
        },
        expiraEm: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: "expira_em",
        },
        estaAtivo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "esta_ativo",
        }
    },
    {
        tableName: "tb_usuario",
        createdAt: false,
        updatedAt: false,
        deletedAt: false,
    }
);

module.exports = Usuario;