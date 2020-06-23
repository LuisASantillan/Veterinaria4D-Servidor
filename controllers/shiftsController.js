const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const shift = require('../models/shifts/Shift');
const user = require('../models/users/Users');


//AddShifts
exports.addShifts = async (req, res) => {
   
    try {
        
        let shifts = new shift(req.body);
        // Guardamos el Producto en la BD
        await shifts.save();
        res.json({ msg: 'Turno Guardado', shifts });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

// Lista Turnos Solicitados
exports.listShifts = async (req, res) => {
    try {
        const shifts = await shift.find();
        res.json({ shifts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};


//Listar Shifts Por Id
exports.listShiftsByUsr =  async (req, res) => {
    try {
        
        // Controlar la categoria
        const users = await user.findById(req.params.id);
        if(!users){
            res.status(400).json({ msg: 'La Categoria no existe.'});
        }

        // Buscar y listar los Productos
        const shifts = await shift.find({ user: users._id });
        res.json({ shifts });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.'});
    }
};

