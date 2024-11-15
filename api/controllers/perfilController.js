const perfilService = require('../services/perfilService');
const express = require('express');
/**
 * Controller da entidade `Perfil`.
 */
const router = express.Router()

/**
 * Busca todos os perfis
 */
router.get('/', (req, res) => {
    perfilService.findAll()
        .then(perfis => {
            return res.status(200).json(perfis);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Busca perfil pelo ID
 */
router.get('/:id', (req, res) => {
    perfilService.findById(req.params.id)
        .then(perfil => {
            if (!perfil) return res.status(404).json("Perfil não existe!");
            return res.status(200).json(perfil);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Insere um novo perfil
 */
router.post('/', (req, res) => {
    perfilService.insert(req.body)
        .then(perfilCriado => {
            return res.status(201).json(perfilCriado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

/**
 * Atualiza um perfil
 */
router.put('/:id', (req, res) => {
    perfilService.update(req.body, req.params.id)
        .then(perfilAtualizado => {
            if (!perfilAtualizado) return res.status(404).json("Perfil não existe!");
            return res.status(200).json(perfilAtualizado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

module.exports = router;