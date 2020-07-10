const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
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
        ref: 'Category',
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductsSchemma);
