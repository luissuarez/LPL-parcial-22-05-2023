const httpStatusCodes = require('http2').constants;
const { validationResult } = require("express-validator");
const VehiculoModel = require('../models/vehiculos.model')

const getAll = async (_, res) => {
    try {
        const vehiculosDB = await VehiculoModel.find();
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculosDB);
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo acceder a la db'});
    }
}

const getByPatente = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
        return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: errors.array() });
    try {
        const patente = req.params.patente
        const vehiculoDB = await VehiculoModel.findOne({patente : patente});
        if(vehiculoDB) 
            res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculoDB);
        else
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
               .json({ mensaje: `El vehiculos con patente ${patente} no fue encontrado`}); 
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: 'No se pudo acceder a la db'});
    }   
}

const updateByPatente = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
        return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: errors.array() });
    
    const patente = req.params.patente
   
    try {
        const vehiculoDB = await VehiculoModel.findOne({patente : patente});
        if(vehiculoDB) {
            const vehiculoData = req.body;
            if(typeof vehiculoData.habilitado !== 'undefined')
                vehiculoDB.habilitado = vehiculoData.habilitado;
            if(vehiculoData.capacidad)
                vehiculoDB.capacidad = vehiculoData.capacidad;
            if(vehiculoData.autonomiaKms)
                vehiculoDB.autonomiaKms = vehiculoData.autonomiaKms;
         
           await VehiculoModel.updateOne(vehiculoDB);
           const vehiculoDBUpdated = await VehiculoModel.findOne({patente : patente});
           res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({"vehiculo":  vehiculoDBUpdated});
        } else{
            res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
               .json({ mensaje: `La operación de modicar no pudo ser realizada. El vehiculo con patente ${patente} no fue encontrado`});
        }
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: `El vehiculo con patente ${vehiculoData.patente} no se pudo actualizar en la db`});
    }
}

const create = async (req, res) => {
    const errors = validationResult(req);
     
    if (!errors.isEmpty()) 
        return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST).json({ mensaje: errors.array() });
    
    try {
        const vehiculoData = req.body;
        const vehiculoDB = await VehiculoModel.findOne({patente : vehiculoData.patente});
        if(vehiculoDB) 
            return res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
                      .json({mensaje: `El vehiculo con patente ${vehiculoData.patente} ya existe en la base de datos`});

        vehiculoData.habilitado = false;
        const vehiculo = await VehiculoModel.create(vehiculoData);
        res.status(httpStatusCodes.HTTP_STATUS_CREATED)
           .json({mensaje: `El vehiculo fue creado correctamente`, vehiculo}); 
    } catch (error) {
        console.log(error.message);
        res.status(httpStatusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR)
           .json({mensaje: `El vehiculo con patente ${vehiculoData.patente} no se pudo guardar en la db`});
    }
}

module.exports = { getAll, getByPatente, updateByPatente, create}