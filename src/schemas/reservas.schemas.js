const mongoose = require('mongoose');
const vehiculoSchema = require('../schemas/vehiculos.schema');
const reservaSchema = mongoose.Schema(
    {
        cliente : {
            type : String,
            require : true
        },
        cantPersonas : {
            type : Number,
            require : true
        },
        distancia : {
            type : Number,
            require : true
        },
        fecha : {
            type : Date,
            require : true
        },
        vehiculo : {
           type : [vehiculoSchema] 
        } 
    }, {
        timestamps : true
    }
);
module.exports = reservaSchema;