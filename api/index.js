const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

const Usuario = require('./models/Usuario');
const Curso = require('./models/curso');
const Perfil = require('./models/perfil');
const Instrutor = require('./models/instrutor');
const Tema = require('./models/tema');

const database = require('./db/config');
const associations = require('./models/associations');

associations();
database.sync();

app.use(cors());
app.use(express.json());

// Endpoint de teste
app.get('/', (req, res) => {
    return res.status(200).json("API works!");
});

// Busca usuário pelo ID
app.get('/usuario/:id', (req, res) => {
    Usuario.findByPk(req.params.id, {
        include: [
            {
                model: Perfil,
                as: "perfis",
            },
        ],
    }).then(usuario => {
        if(!usuario) return res.status(400).json("Usuário não existe!");
        return res.status(200).json(usuario);
    }, error => {
        console.log(error);
        return res.status(500).json("Erro interno!");
    });
});

// Busca curso pelo ID
app.get('/curso/:id', (req, res) => {
    Curso.findByPk(req.params.id, {
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
    }).then(curso => {
        if(!curso) return res.status(400).json("Curso não existe!"); 
        return res.status(200).json(curso);
    }, error => {
        console.log(error);
        return res.status(500).json("Erro interno!");
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})