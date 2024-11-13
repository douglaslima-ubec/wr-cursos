const cursoService = require('../services/cursoService');
const express = require('express');
/**
 * Controller da entidade `Curso`.
 */
const router = express.Router()

/**
 * Busca todos os cursos
 */
router.get('/', (req, res) => {
    cursoService.findAll()
        .then(cursos => {
            return res.status(200).json(cursos);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/** 
 * Busca curso pelo ID
 */
router.get('/:id', (req, res) => {
    cursoService.findById(req.params.id)
        .then(curso => {
            if (!curso) return res.status(400).json("Curso não existe!");
            return res.status(200).json(curso);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Insere um novo curso
 */
router.post('/', (req, res) => {
    cursoService.insert(req.body)
        .then(cursoCriado => {
            return res.status(200).json(cursoCriado);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

/**
 * Atualiza um curso
 */
router.put('/:id', (req, res) => {
    cursoService.update(req.body, req.params.id)
        .then(cursoAtualizado => {
            if (!cursoAtualizado) return res.status(404).json("Curso não existe!");
            return res.status(200).json(cursoAtualizado);
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json("Erro interno!");
        });
});

module.exports = router;