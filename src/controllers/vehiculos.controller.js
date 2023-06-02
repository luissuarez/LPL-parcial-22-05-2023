const vehiculos = require('../../data/vehiculos.json');
const httpStatusCodes = require('http2').constants;
const { validationResult } = require("express-validator");

const getAll = (req, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculos);
}

const getByPatente = (req, res) => {
    const patente = req.params.patente

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ mensaje: errors.array() });
    }

    const vehiculo = vehiculos.find(v => v.patente == patente);
    
    if(vehiculo)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculo); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `El vehiculos con patente ${patente} no fue encontrado`});    
}

const updateByPatente = (req, res) => {
    const patente = req.params.patente
    const indexVehiculo = vehiculos.findIndex(v => v.patente == patente);
    if(indexVehiculo != -1) {
        const vehiculoData = req.body;
        vehiculos[indexVehiculo].habilitado = (typeof vehiculoData.habilitado !== 'undefined') ? vehiculoData.habilitado : vehiculos[indexVehiculo].habilitado;
        vehiculos[indexVehiculo].capacidad = (typeof vehiculoData.capacidad !== 'undefined') ? vehiculoData.capacidad : vehiculos[indexVehiculo].capacidad;
        vehiculos[indexVehiculo].autonomiaKms = (typeof vehiculoData.autonomiaKms !== 'undefined') ? vehiculoData.autonomiaKms : vehiculos[indexVehiculo].autonomiaKms;
        res.status(httpStatusCodes.HTTP_STATUS_CREATED).json({"vehiculo":  vehiculos[indexVehiculo]});
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `La operación de modicar no pudo ser realizada. El vehiculo con patente ${patente} no fue encontrado`});
    }
}

const create = (req, res) => {
    const vehiculoData = req.body;
    const indexVehiculo = vehiculos.findIndex(v => v.patente == vehiculoData.patente);
    if (indexVehiculo == -1) {
        vehiculoData.habilitado = false;
        vehiculos.push(vehiculoData);
        res.status(httpStatusCodes.HTTP_STATUS_CREATED)
           .json({mensaje: `El vehiculo fue creado correctamente`,
                  vehiculo: vehiculoData}); 
  
    } else {
        res.status(httpStatusCodes.HTTP_STATUS_BAD_REQUEST)
           .json({mensaje: `El vehiculo con patente ${vehiculoData.patente} ya existe en la base de datos`});
    }
}

module.exports = { getAll, getByPatente, updateByPatente, create, vehiculos}