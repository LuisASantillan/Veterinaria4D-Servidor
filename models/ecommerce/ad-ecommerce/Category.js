const mongoose = require('mongoose');
// Definimos el Schema
const CategorySchemma = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    datecreate: {
        type: Date,
        default: Date.now()
    },
});
// Definimos el modelo Meme con el schema correspondiente
module.exports = mongoose.model('Category', CategorySchemma);
