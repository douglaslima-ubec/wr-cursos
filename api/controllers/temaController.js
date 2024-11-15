const temaService = require('../services/temaService');
const express = require('express');
/**
 * Controller da entidade `Tema`.
 */
const router = express.Router()

/**
 * Busca todos os temas
 */
router.get('/', (req, res) => {
    temaService.findAll()
        .then(temas => {
            return res.status(200).json(temas);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Busca tema pelo ID
 */
router.get('/:id', (req, res) => {
    temaService.findById(req.params.id)
        .then(tema => {
            if (!tema) return res.status(404).json("Tema não existe!");
            return res.status(200).json(tema);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Insere um novo tema
 */
router.post('/', (req, res) => {
    temaService.insert(req.body)
        .then(temaCriado => {
            return res.status(201).json(temaCriado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

/**
 * Atualiza um tema
 */
router.put('/:id', (req, res) => {
    temaService.update(req.body, req.params.id)
        .then(temaAtualizado => {
            if (!temaAtualizado) return res.status(404).json("Tema não existe!");
            return res.status(200).json(temaAtualizado);
        })
        .catch(error => {
            console.log(error);
            return res.status(400).json(error);
        });
});

module.exports = router;