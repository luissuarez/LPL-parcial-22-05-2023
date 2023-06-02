const { param } = require("express-validator");

const vehiculoDataValidateChainableAPI = [
    param("patente")
        .isLength({ min : 7, max : 7 })
        .withMessage("La patente debe contener 7 caracteres. ")
        .matches("^[A-Z]{2}[0-9]{3}[A-Z]{2}$")
        .withMessage("La patente debe ser un string. Formato [XX999XX]")
];

module.exports = { vehiculoDataValidateChainableAPI };