const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');
const {vehiculoDataValidateChainableAPI} = require('../validations/vehiculosvalidation')

router.get('/', vehiculosController.getAll);
router.get('/:patente',vehiculoDataValidateChainableAPI, vehiculosController.getByPatente);
router.put('/:patente', vehiculosController.updateByPatente);
router.post('/', vehiculosController.create);


module.exports = { router };