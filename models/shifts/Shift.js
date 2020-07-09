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
        ref: 'Speciality' , 
        trim: true
    },
    specie: {
        type: Schemma.Types.ObjectId,
        ref: 'Specie' , 
        trim: true
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    user:{
        type: Schemma.Types.ObjectId,
        ref: 'User' 
    } , 
    state:{
        type:Boolean, 
        trim: true, 
        default: false
    }
    
});

module.exports = mongoose.model('Shift', ShiftSchemma);
