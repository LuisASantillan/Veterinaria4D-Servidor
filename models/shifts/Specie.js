const mongoose      = require('mongoose');
const Schemma       = mongoose.Schema;
const SpecieSchemma = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('species', SpecieSchemma);
