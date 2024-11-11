const usuarioService = require('../services/usuarioService');
const express = require('express');
/**
 * Controller da entidade `Usuario`.
 */
const router = express.Router()

/**
 * Busca todos os usuários
 */
router.get('/', (req, res) => {
    usuarioService.findAll()
        .then(usuarios => {
            return res.status(200).json(usuarios);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Busca usuário pelo ID
 */
router.get('/:id', (req, res) => {
    usuarioService.findById(req.params.id)
        .then(usuario => {
            if (!usuario) return res.status(400).json("Usuário não existe!");
            return res.status(200).json(usuario);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Insere um novo usuário
 */
router.post('/', (req, res) => {
    console.log(req.body);
    usuarioService.insert(req.body)
        .then(usuario => {
            return res.status(201).json(usuario);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

module.exports = router;