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
            if (!usuario) return res.status(404).json("Usuário não existe!");
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
    usuarioService.insert(req.body)
        .then(usuarioCriado => {
            return res.status(201).json(usuarioCriado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

/**
 * Atualiza um usuário
 */
router.put('/:id', (req, res) => {
    usuarioService.update(req.body, req.params.id)
        .then(usuarioAtualizado => {
            if (!usuarioAtualizado) return res.status(404).json("Usuário não existe!");
            return res.status(200).json(usuarioAtualizado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

module.exports = router;