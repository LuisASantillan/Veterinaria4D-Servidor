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

module.exports = mongoose.model('Specie', SpecieSchemma);
