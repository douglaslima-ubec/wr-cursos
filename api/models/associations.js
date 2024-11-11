const Usuario = require('./usuario');
const Curso = require('./curso');
const Instrutor = require('./instrutor');
const Perfil = require('./perfil');
const Tema = require('./tema');

exports.UsuarioCurso = Usuario.hasMany(Curso, {
    foreignKey: "criado_por",
    as: "cursos",
});

exports.CursoUsuario = Curso.belongsTo(Usuario, {
    foreignKey: "criado_por",
    as: "usuario",
});

exports.UsuarioPerfil = Usuario.belongsToMany(Perfil, {
    through: {
        model: "tb_usuario_perfis",
        unique: false,
    },
    foreignKey: {
        name: "usuarioId",
        field: "usuario_id",
    },
    otherKey: {
        name: "perfilId",
        field: "perfil_id",
    },
    as: "perfis",
});

exports.PerfilUsuario = Perfil.belongsToMany(Usuario, {
    through: {
        model: "tb_usuario_perfis",
        unique: false,
    },
    foreignKey: {
        name: "perfilId",
        field: "perfil_id",
    },
    otherKey: {
        name: "usuarioId",
        field: "usuario_id",
    },
    as: "usuarios",
});

exports.CursoInstrutor = Curso.belongsToMany(Instrutor, {
    through: {
        model: "tb_curso_instrutores",
        unique: false,
    },
    foreignKey: "curso_id",
    as: "instrutores",
});

exports.InstrutorCurso = Instrutor.belongsToMany(Curso, {
    through: {
        model: "tb_curso_instrutores",
        unique: false,
    },
    foreignKey: "instrutor_id",
    as: "cursos",
});

exports.CursoTema = Curso.belongsToMany(Tema, {
    through: {
        model: "tb_curso_temas",
        unique: false,
    },
    foreignKey: "curso_id",
    as: "temas",
});

exports.TemaCurso = Tema.belongsToMany(Curso, {
    through: {
        model: "tb_curso_temas",
        unique: false,
    },
    foreignKey: "tema_id",
    as: "cursos",
});