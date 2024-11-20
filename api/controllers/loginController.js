const usuarioService = require('../services/usuarioService');
const passwordService = require('../services/passwordService');
const express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../services/jwtService');
/**
 * Controller de autenticação
 */
const router = express.Router();

/**
 * Verifica as informações de login e caso as informações fornecidas sejam válidas,
 * retorna um token JWT com as informações do usuário e um tempo de expiração.
 */
router.post('/', (req, res) => {
    if (!req.body.email) return res.status(400).json("É obrigatório informar o e-mail!");
    if (!req.body.senha) return res.status(400).json("É obrigatório informar a senha!");
    usuarioService.findByEmail(req.body)
        .then(usuario => {
            if (usuario.length == 0) {
                return res.status(401).json("E-mail incorreto!");
            }
            if (!passwordService.verifyPasswordHash(req.body.senha, usuario[0].senha)) {
                return res.status(401).json("Senha incorreta!");
            }
            let token = jwt.sign(
                {
                    usuario: {
                        usuarioId: usuario[0].usuarioId,
                        nome: usuario[0].nome,
                        usuario: usuario[0].usuario,
                        email: usuario[0].email,
                        perfis: usuario[0].perfis
                    }
                },
                SECRET_KEY,
                {
                    expiresIn: "1h",
                }
            );
            return res.status(200).json(token);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json(error);
        });
});

module.exports = router;