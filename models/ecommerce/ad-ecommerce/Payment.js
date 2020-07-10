const mongoose = require('mongoose');
const Schemma   = mongoose.Schema;
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
        ref: 'User'

    } , 
    datepayment: {
        type: Date,
        default: Date.now()
    },

    
});

module.exports = mongoose.model('Payment', PaymentsSchemma);
