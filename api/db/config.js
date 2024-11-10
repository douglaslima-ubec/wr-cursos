const {Sequelize} = require('sequelize');
module.exports = new Sequelize({
    host: "localhost",
    username: "root",
    password: "",
    database: "wrcursos",
    dialect: "mysql",
});