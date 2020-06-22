const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const speciality = require('../models/shifts/Speciality');

//AddShifts
exports.addSpeciality = async (req, res) => {
   
    try {
        
        let specialitys = new speciality(req.body);
        // Guardamos el Producto en la BD
        await specialitys.save();
        res.json({ msg: 'Especialidad Guardada', specialitys });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


// Lista los Especialidades
exports.listSpecialitys = async (req, res) => {
    try {
        const specialitys = await speciality.find();
        res.json({ specialitys });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};