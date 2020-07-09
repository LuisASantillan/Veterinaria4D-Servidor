const mongoose = require('mongoose');
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

module.exports = mongoose.model('Category', CategorySchemma);
