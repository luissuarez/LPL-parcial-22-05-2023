const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const vehiculoRouter = require('./routes/vehiculos.route')

app.use(express.json())
app.use('/api/vehiculo', vehiculoRouter.router)

app.listen(PORT, ()=>{console.log(`App lista escuhando en el puerto ${PORT}`)} )
