const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const vehiculoRouter = require('./routes/vehiculos.route');
const reservasRouter = require('./routes/reservas.route');

app.use(express.json());
app.use('/api/vehiculo', vehiculoRouter.router);
app.use('/api/reservas', reservasRouter.router);

mongoose.connect('mongodb://admin:123@localhost:27023/reservas').then(() => {
    console.log('Connected to MongoDb');
    app.listen(PORT, ()=>{
        console.log(`App lista escuhando en el puerto ${PORT}`)
    } );
}).catch((error) => {
    console.log(error);
});