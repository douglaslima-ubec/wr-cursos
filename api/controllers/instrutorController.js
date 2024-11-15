const instrutorService = require('../services/instrutorService');
const express = require('express');
/**
 * Controller da entidade `Instrutor`.
 */
const router = express.Router()

/**
 * Busca todos os instrutores
 */
router.get('/', (req, res) => {
    instrutorService.findAll()
        .then(instrutores => {
            return res.status(200).json(instrutores);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Busca instrutor pelo ID
 */
router.get('/:id', (req, res) => {
    instrutorService.findById(req.params.id)
        .then(instrutor => {
            if (!instrutor) return res.status(404).json("Instrutor não existe!");
            return res.status(200).json(instrutor);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Insere um novo instrutor
 */
router.post('/', (req, res) => {
    instrutorService.insert(req.body)
        .then(instrutorCriado => {
            return res.status(201).json(instrutorCriado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

/**
 * Atualiza um instrutor
 */
router.put('/:id', (req, res) => {
    instrutorService.update(req.body, req.params.id)
        .then(instrutorAtualizado => {
            if (!instrutorAtualizado) return res.status(404).json("Instrutor não existe!");
            return res.status(200).json(instrutorAtualizado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

module.exports = router;