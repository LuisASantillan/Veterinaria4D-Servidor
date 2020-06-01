const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
// Definimos el Schema
const ProductsSchemma = mongoose.Schema({

    detail: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    urlimg: {
        type: String,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    }  , 
    category: {
        type: Schemma.Types.ObjectId,
        ref: 'category',
        required: true,
    },
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('Products', ProductsSchemma);
