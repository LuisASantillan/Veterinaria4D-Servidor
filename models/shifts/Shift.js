const mongoose     = require('mongoose');
const Schemma      = mongoose.Schema;
const ShiftSchemma = mongoose.Schema({

    petname: {
        type: String,
        required: true,
        trim: true
    },
    dateshifts: {
        type: Date,
        required: true,
        trim: true
    },
    speciality: {
        type: Schemma.Types.ObjectId,
        ref: 'specialitys' , 
        trim: true
    },
    specie: {
        type: Schemma.Types.ObjectId,
        ref: 'species' , 
        trim: true
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    user:{
        type: Schemma.Types.ObjectId,
        ref: 'users' 
    } , 
    state:{
        type:Boolean, 
        trim: true, 
        default: false
    }
    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('shifts', ShiftSchemma);
