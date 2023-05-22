const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const vehiculoRouter = require('./routes/vehiculos.route');
const reservasRouter = require('./routes/reservas.route');

app.use(express.json());
app.use('/api/vehiculo', vehiculoRouter.router);
app.use('/api/reservas', reservasRouter.router);


app.listen(PORT, ()=>{console.log(`App lista escuhando en el puerto ${PORT}`)} );
