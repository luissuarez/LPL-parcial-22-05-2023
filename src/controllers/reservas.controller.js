const reservas = require('../../data/reservas.json');
const httpStatusCodes = require('http2').constants;

const getAll = (req, res) => {
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


module.exports = { getAll, getById, deleteById }