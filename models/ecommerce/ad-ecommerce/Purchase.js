const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    } , 

    adress:{
        type: String,
        trim: true
    }
    
});

PurchaseSchemma.plugin(mongoosePaginate);

mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 5
  };

// Definimos el modelo Meme con el schema correspondiente
const model =  mongoose.model('Purchase', PurchaseSchemma);


module.exports = model


