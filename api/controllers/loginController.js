const usuarioService = require('../services/usuarioService');
const passwordHashService = require('../services/passwordHashService');
const express = require('express');
/**
 * Controller de autenticação
 */
const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.email) return res.status(400).json("É obrigatório informar o e-mail!");
    usuarioService.findByEmail(req.body)
        .then(usuario => {
            if (!usuario || usuario?.length == 0) return res.status(401).json("E-mail incorreto!");
            if (!req.body.senha) {
                return res.status(400).json("É obrigatório informar a senha!");
            }
            if (!passwordHashService.verifyPasswordHash(req.body.senha, usuario[0].senha)) {
                return res.status(401).json("Senha incorreta!");
            }
            return res.status(200).json(usuario);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });
});

module.exports = router;