const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controller');

router.get('/', reservasController.getAll);
router.get('/:id', reservasController.getById);
router.delete('/:id', reservasController.deleteById);
router.post('/', reservasController.create);

module.exports = { router };