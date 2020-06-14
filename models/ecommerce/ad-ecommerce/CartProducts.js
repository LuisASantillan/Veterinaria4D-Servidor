const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
// Definimos el Schema
const CartProductSchemma = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    details: {
        type: String,
        required: true,
        trim: true
    },

    knt: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },
    
    dateship: {
        type: Date,
        default: Date.now()
    },

    users: {
        type: Schemma.Types.ObjectId,
        ref: 'users',
        required: true
    } , 
    
    purchase : {
        type: Schemma.Types.ObjectId,
        ref: 'purchase'
        //required: true
    } , 

    payment :{
        type: Schemma.Types.ObjectId,
        ref: 'payments'
        //required: true
    } , 

    product : {
        type: Schemma.Types.ObjectId,
        ref: 'products'
        //required: true
    }
    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('CardProduct', CartProductSchemma);
