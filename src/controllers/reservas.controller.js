const reservas = require('../../data/reservas.json');
const httpStatusCodes = require('http2').constants;
const vehiculosController = require('../controllers/vehiculos.controller');
const { validationResult } = require("express-validator");

const getAll = (_, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(reservas);
}

const getById = (req, res) => {
    const id = req.params.id;
    const reserva = reservas.find(r => r.id == id);
    
    if(reserva)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(reserva); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `La reserva con id ${id} no fue encontrada`});    
}

const deleteById = (req, res) => {
    const id = req.params.id;
    const indexReserva = reservas.findIndex(r => r.id == id);
    if(indexReserva >= 0) {
        const reserva = reservas[indexReserva];
        reservas.splice(indexReserva, 1);
        res.status(httpStatusCodes.HTTP_STATUS_OK).json({
            mensaje: "La operación de borrado pudo realizarse con exito",
            reserva : reserva
        });
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
            mensaje: `La operación de borrado no pudo ser realizada. La reserva con id ${id} no fue encontrada`
        } );
    }
}

const create = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
        return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: errors.array() });

    const reservaData = req.body;
    const vehiculo = vehiculosController.vehiculos.find(v => v.habilitado && v.capacidad >= reservaData.cantPersonas && v.autonomiaKms >= reservaData.distancia);

    if (vehiculo) {
        const id = reservas.map(e => e.id).reduce((e1, e2) => e1 > e2 ? e1 : e2, 0) + 1;
        const reserva = {id, ...reservaData, vehiculo};
        reservas.push(reserva);
        res.status(httpStatusCodes.HTTP_STATUS_CREATED)
           .json({mensaje: `La reserva fue creada correctamente`,
                  reserva: reserva}); 
  
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
           .json({mensaje: `No hay ningun vehículo habilitado que satisface la reserva.`});
    }
}


module.exports = { getAll, getById, deleteById, create}