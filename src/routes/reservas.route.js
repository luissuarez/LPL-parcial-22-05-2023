const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservas.controller');
const { reservaBodyValidator } = require('../validations/reservas.validation')

router.get('/', reservasController.getAll);
router.get('/:id', reservasController.getById);
router.delete('/:id', reservasController.deleteById);
router.post('/', reservaBodyValidator, reservasController.create);

module.exports = { router };