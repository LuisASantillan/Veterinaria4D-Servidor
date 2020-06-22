const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const specie = require('../models/shifts/Specie');

//AddShifts
exports.addSpecie = async (req, res) => {
   
    try {
        
        let species = new specie(req.body);
        // Guardamos el Producto en la BD
        await species.save();
        res.json({ msg: 'Especie Guardada', species });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

// Lista los Especies
exports.listSpecies = async (req, res) => {
    try {
        const species = await specie.find();
        res.json({ species });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};
