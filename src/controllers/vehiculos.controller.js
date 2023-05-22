const vehiculos = require('../../data/vehiculos.json');
const httpStatusCodes = require('http2').constants;

const getAll = (req, res) => {
    res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculos);
}

const getByPatente = (req, res) => {
    const patente = req.params.patente
    const vehiculo = vehiculos.find(v => v.patente == patente);
    
    if(vehiculo)
        res.status(httpStatusCodes.HTTP_STATUS_OK).json(vehiculo); 
    else
        res.status(httpStatusCodes.HTTP_STATUS_NOT_FOUND)
           .json({ mensaje: `El vehiculos con patente ${patente} no fue encontrado`});    
}

module.exports = { getAll, getByPatente}