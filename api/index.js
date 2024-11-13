const express = require('express');
const cors = require('cors');
const PORT = 8080;
const database = require('./db/config');
const associations = require('./models/associations');
// Models
const Usuario = require('./models/usuario');
const Curso = require('./models/curso');
const Perfil = require('./models/perfil');
const Instrutor = require('./models/instrutor');
const Tema = require('./models/tema');
// Routers
const usuarioRouter = require('./controllers/usuarioController');
const cursoRouter = require('./controllers/cursoController');
const perfilRouter = require('./controllers/perfilController');
const instrutorRouter = require('./controllers/instrutorController');
const temaRouter = require('./controllers/temaController');

// Sincroniza as models com o banco de dados
database.sync();

// Cria uma instância da Aplicação Express
const app = express();
// Adiciona a configuração Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Converte o corpo das requisições para JSON
app.use(express.json());

// Adiciona a rota dos controllers
app.use('/usuario', usuarioRouter);
app.use('/curso', cursoRouter);
app.use('/perfil', perfilRouter);
app.use('/instrutor', instrutorRouter);
app.use('/tema', temaRouter);

// Endpoint de teste
app.get('/', (req, res) => {
    return res.status(200).json("API works!");
});

// Inicia a API
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})