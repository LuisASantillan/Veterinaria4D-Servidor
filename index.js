require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('./database');
const morgan   = require('morgan');


// Crear el servidor
const app = express();

// Puerto de la App
const PORT = process.env.PORT || 4030 ;

// Middlewares
//app.use(express.json()); // for parsing application/json
//app.use(express.urlencoded({ extended: true })); // for parsing
app.use(express.json({limit: '10mb'})); // for parsing application/json
app.use(express.urlencoded({ limit: '10mb', extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Middlewares
app.use(morgan('dev'));


// Definimos las RUTAS
// Iniciar la App

// Rutas
app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});





