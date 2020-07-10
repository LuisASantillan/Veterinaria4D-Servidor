const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
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

    user: {
        type: Schemma.Types.ObjectId,
        ref: 'User',
        required: true
    } , 
    
    purchase : {
        type: Schemma.Types.ObjectId,
        ref: 'Purchase'
        
    } , 

    payment :{
        type: Schemma.Types.ObjectId,
        ref: 'Payment'
        
    } , 

    product : {
        type: Schemma.Types.ObjectId,
        ref: 'Product'
        
    }
    
});

module.exports = mongoose.model('CardProduct', CartProductSchemma);
