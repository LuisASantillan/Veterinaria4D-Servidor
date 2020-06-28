const mongoose = require('mongoose');
// Definimos el Schema
const UserSchemma = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    isadmin: {
        type: Boolean,
        trim: true , 
        default : false
    },
    adress:{
        type: String,
        trim: true
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('users', UserSchemma);
