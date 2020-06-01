const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
// Definimos el Schema
const PaymentsSchemma = mongoose.Schema({

    numbercard: {
        type: String,
        required: true,
        trim: true
    },
    dateexp: {
        type: String,
        required: true,
        trim: true
    },
    codesec: {
        type: String,
        trim: true
    },
    shipprice: {
        type: Number,
        required: true,
        trim: true
    },
    users: {
        type: Schemma.Types.ObjectId,
        ref: 'users',
        required: true
    }

    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('Payments', PaymentsSchemma);
