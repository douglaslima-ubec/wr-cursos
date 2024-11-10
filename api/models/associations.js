const Usuario = require('./Usuario');
const Curso = require('./curso');
const Instrutor = require('./instrutor');
const Perfil = require('./perfil');
const Tema = require('./tema');

module.exports = () => {
    // USUARIO -> CURSO
    Usuario.hasMany(Curso, {
        foreignKey: "criado_por",
        as: "cursos",
    });
    Curso.belongsTo(Usuario, {
        foreignKey: "criado_por",
        as: "usuario",
    });
    // USUARIO -> PERFIL
    Usuario.belongsToMany(Perfil, {
        through: {
            model: "tb_usuario_perfis",
            unique: false,
        },
        foreignKey: "usuario_id",
        as: "perfis",
    });
    Perfil.belongsToMany(Usuario, {
        through:  {
            model: "tb_usuario_perfis",
            unique: false,
        },
        foreignKey: "perfil_id",
        as: "usuarios",
    });
    // CURSO -> INSTRUTOR
    Curso.belongsToMany(Instrutor, {
        through: {
            model: "tb_curso_instrutores",
            unique: false,
        },
        foreignKey: "curso_id",
        as: "instrutores",
    });
    Instrutor.belongsToMany(Curso, {
        through: {
            model: "tb_curso_instrutores",
            unique: false,
        },
        foreignKey: "instrutor_id",
        as: "cursos",
    });
    // CURSO -> TEMA
    Curso.belongsToMany(Tema, {
        through: {
            model: "tb_curso_temas",
            unique: false,
        },
        foreignKey: "curso_id",
        as: "temas",
    });
    Tema.belongsToMany(Curso, {
        through: {
            model: "tb_curso_temas",
            unique: false,
        },
        foreignKey: "tema_id",
        as: "cursos",
    });
}