const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos.controller');
const { patenteParamValidator, vehiculoBodyValidator } = require('../validations/vehiculos.validation')


router.get('/', vehiculosController.getAll);
router.get('/:patente', patenteParamValidator, vehiculosController.getByPatente);
router.put('/:patente', patenteParamValidator, vehiculosController.updateByPatente);
router.post('/', vehiculoBodyValidator, vehiculosController.create);


module.exports = { router };