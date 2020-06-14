const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
// Definimos el Schema
const PurchaseSchemma = mongoose.Schema({

    totalprice: {
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
        ref: 'users'
        //required: true
    } 
    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('Purchase', PurchaseSchemma);
