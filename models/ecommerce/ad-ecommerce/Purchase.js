const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schemma         = mongoose.Schema;
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

    user: {
        type: Schemma.Types.ObjectId,
        ref: 'User'
    } , 

    address:{
        type: String,
        trim: true
    }
    
});

PurchaseSchemma.plugin(mongoosePaginate);
const model =  mongoose.model('Purchase', PurchaseSchemma);


module.exports = model


