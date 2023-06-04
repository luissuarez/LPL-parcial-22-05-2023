const { param , body} = require("express-validator");

const VAL_PATENTE_EXP = '^[A-Z]{2}[0-9]{3}[A-Z]{2}$';
const VAL_PATENTE_LENGTH = { min : 7, max : 7 };
const VAL_CAPACIDAD_RANGE = { min : 1, max : 10 };
const VAL_AUTONOMIA_KMS_RANGE = { min : 1};

const MSG_PATENTE_LENGTH = 'La patente debe contener 7 caracteres';
const MSG_PATENTE_FORMAT = 'La patente debe tener el formato [XX999XX]';
const MSG_CAPACIDAD_RANGE = "La capacidad del vehiculo debe ser entre 1 y 10"
const MSG_AUTONOMIA_KMS_RANGE = "La autonomia en kms debe ser mayor a 0";

const patenteParamValidator = [
    param('patente')
        .isLength(VAL_PATENTE_LENGTH)
        .withMessage(MSG_PATENTE_LENGTH)
        .matches(VAL_PATENTE_EXP)
        .withMessage(MSG_PATENTE_FORMAT)
];

const vehiculoBodyValidator = [
    body("autonomiaKms")
        .isInt(VAL_AUTONOMIA_KMS_RANGE)
        .withMessage(MSG_AUTONOMIA_KMS_RANGE),
    body("capacidad")
        .isInt(VAL_CAPACIDAD_RANGE)
        .withMessage(MSG_CAPACIDAD_RANGE),
    body('patente')
        .isLength(VAL_PATENTE_LENGTH)
        .withMessage(MSG_PATENTE_LENGTH)
        .matches(VAL_PATENTE_EXP)
        .withMessage(MSG_PATENTE_FORMAT)

];

module.exports = { patenteParamValidator, vehiculoBodyValidator };