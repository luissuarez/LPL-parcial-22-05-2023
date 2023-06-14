const mongoose = require('mongoose');
const reservaSchema = require('../schemas/reservas.schemas');
const Reserva = mongoose.model('Reserva', reservaSchema);
module.exports = Reserva;