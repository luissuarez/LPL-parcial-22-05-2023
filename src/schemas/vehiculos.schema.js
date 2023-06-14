const mongoose = require('mongoose');

const vehiculoSchema = mongoose.Schema(
    {
        patente : {
            type : String,
            require : true
        },
        marca : {
            type : String,
            require : true
        },
        modelo : {
            type : String,
            require : true,
        },
        habilitado : {
            type : Boolean,
            require : true,
            default : false
        },
        capacidad : {
            type : Number,
            require : true
        },
        autonomiaKms : {
            type : Number,
            require : true
        }
    }, {
        timestamps : true
    }
);

module.exports = vehiculoSchema;