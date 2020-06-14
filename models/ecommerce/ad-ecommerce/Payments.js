const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
// Definimos el Schema
const PaymentsSchemma = mongoose.Schema({

    expiry: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    cvc: {
        type: String,
        trim: true
    },
    number: {
        type: Number,
        required: true,
        trim: true
    },
    users: {
        type: Schemma.Types.ObjectId,
        ref: 'users'
        //required: true
    } , 
    datepayment: {
        type: Date,
        default: Date.now()
    },

    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('Payments', PaymentsSchemma);
