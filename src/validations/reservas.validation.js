const { body } = require("express-validator");

const VAL_CANTIDAD_PERSONAS_RANGE = { min : 1, max : 10 };
const VAL_DISTANCIA_RANGE = { min : 1, max : 500 };
const VAL_FECHA_EXP = 'YYYY-MM-DD';

const MSG_CANTIDAD_PERSONAS_RANGE = 'Se pueden hacer reservas para un maximo de 10 personas';
const MSG_DISTANCIA_RANGE = 'Se pueden hacer reservas para un maximo de 500 kms';
const MSG_FECHA_EXP = 'La fecha no es valida [YYYY-MM-DD]';

const reservaBodyValidator = [
    body("cantPersonas")
        .isInt(VAL_CANTIDAD_PERSONAS_RANGE)
        .withMessage(MSG_CANTIDAD_PERSONAS_RANGE),
    body("distancia")
        .isInt(VAL_DISTANCIA_RANGE)
        .withMessage(MSG_DISTANCIA_RANGE),
    body("fecha")
        .isDate(VAL_FECHA_EXP)
        .withMessage(MSG_FECHA_EXP)
];

module.exports = { reservaBodyValidator };