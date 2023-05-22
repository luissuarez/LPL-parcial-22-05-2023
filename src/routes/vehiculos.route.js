const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');

router.get('/', vehiculosController.getAll);
router.get('/:patente', vehiculosController.getByPatente);

module.exports = { router };