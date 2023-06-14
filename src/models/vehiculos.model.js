const mongoose = require('mongoose');
const vehiculoSchema = require('../schemas/vehiculos.schema');
const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
module.exports = Vehiculo;
