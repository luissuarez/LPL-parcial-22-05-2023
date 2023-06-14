const httpStatusCodes = require('http2').constants;
const { validationResult } = require("express-validator");
const Reserva = require('../models/reservas.model');
const Vehiculo = require('../models/vehiculos.model');
const mongoose = require('mongoose');


const getAll = async (_, res) => {
    try {
        const reservas = await Reserva.find();
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(reservas);
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo acceder a la db'});
    }
 }

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: `El Id ${id} no es valido`});
        const reserva = await Reserva.findById(id);
        if(reserva)
            res.status(httpStatusCodes.HTTP_STATUS_OK).json(reserva); 
        else
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({ mensaje: `La reserva con id ${id} no fue encontrada`});    
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo acceder a la db'});
    }   
}

const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: `El Id ${id} no es valido`});
        
        const reserva = await Reserva.findOneAndDelete({_id : id});
        if(reserva) {
            res.status(httpStatusCodes.HTTP_STATUS_OK).json({
                mensaje: "La operación de borrado pudo realizarse con exito",
                reserva : reserva
            });
        } else {
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND).json({
                mensaje: `La operación de borrado no pudo ser realizada. La reserva con id ${id} no fue encontrada`
            } );
        }
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo acceder a la db'});
    }  
}

const create = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
        return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: errors.array() });
    
    try {
        const reservaData = req.body;
        const vehiculo = await Vehiculo.findOne({$and:[{habilitado: true}, {capacidad: {$gte: reservaData.cantPersonas }}, {autonomiaKms: {$gte: reservaData.distancia}}]});
        
        if (vehiculo) {
            const newReserva = {...reservaData, vehiculo};
            const reserva = await Reserva.create(newReserva);
            res.status(httpStatusCodes.HTTP_STATUS_CREATED)
               .json({mensaje: `La reserva fue creada correctamente`, reserva}); 
        } else {
            res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
               .json({mensaje: `No hay ningun vehículo habilitado que satisface la reserva.`});
        }
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo crear la reserva en la db'});
    }
}

module.exports = { getAll, getById, deleteById, create}