const Usuario = require('./usuario');
const Curso = require('./curso');
const Instrutor = require('./instrutor');
const Perfil = require('./perfil');
const Tema = require('./tema');

exports.UsuarioCurso = Usuario.hasMany(Curso, {
    foreignKey: {
        name: "criadoPor",
        field: "criado_por",
    },
    as: "cursos",
});

exports.CursoUsuario = Curso.belongsTo(Usuario, {
    foreignKey: {
        name: "criadoPor",
        field: "criado_por",
    },
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
    foreignKey: {
        name: "cursoId",
        field: "curso_id",
    },
    otherKey: {
        name: "instrutorId",
        field: "instrutor_id",
    },
    as: "instrutores",
});

exports.InstrutorCurso = Instrutor.belongsToMany(Curso, {
    through: {
        model: "tb_curso_instrutores",
        unique: false,
    },
    foreignKey: {
        name: "instrutorId",
        field: "instrutor_id",
    },
    otherKey: {
        name: "cursoId",
        field: "curso_id",
    },
    as: "cursos",
});

exports.CursoTema = Curso.belongsToMany(Tema, {
    through: {
        model: "tb_curso_temas",
        unique: false,
    },
    foreignKey: {
        name: "cursoId",
        field: "curso_id",
    },
    otherKey: {
        name: "temaId",
        field: "tema_id",
    },
    as: "temas",
});

exports.TemaCurso = Tema.belongsToMany(Curso, {
    through: {
        model: "tb_curso_temas",
        unique: false,
    },
    foreignKey: {
        name: "temaId",
        field: "tema_id",
    },
    otherKey: {
        name: "cursoId",
        field: "curso_id",
    },
    as: "cursos",
});