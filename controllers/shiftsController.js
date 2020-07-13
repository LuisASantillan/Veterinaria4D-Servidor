const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const shift = require('../models/shifts/Shift');
const user = require('../models/users/User');


//AddShifts
exports.addShifts = async (req, res) => {

    try {

        let shifts = new shift(req.body);
        await shifts.save();
        res.json({ msg: 'Turno Guardado', shifts });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

// Lista Turnos Solicitados
exports.listShifts = async (req, res) => {
 
    shift.aggregate(
        [
            {
                $lookup:
                {
                    from: 'species',
                    localField: 'specie',
                    foreignField: '_id',
                    as: 'species'
                }
            },
            {
                $lookup:
                {
                    from: 'specialities',
                    localField: 'speciality',
                    foreignField: '_id',
                    as: 'specialitys'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;
            res.json({ data });
        }
    )
};


//Listar Shifts Por Id
exports.listShiftsByUsr = async (req, res) => {

    const users = await user.findById(req.params.id);
    if(!users){
        res.status(400).json({ msg: 'La Categoria no existe.'});
    }

    shift.aggregate(
        [
            {
                $match: {
                    user: users._id
                }
            },
            {
                $lookup:
                {
                    from: 'species',
                    localField: 'specie',
                    foreignField: '_id',
                    as: 'species'
                }
            },
            {
                $lookup:
                {
                    from: 'specialities',
                    localField: 'speciality',
                    foreignField: '_id',
                    as: 'specialitys'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;
            res.json({ data });
        }
    )
};

exports.editShifts = async (req, res) => {
    try {
        
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'EL turno no existe' });
        }
      
        let shiftedit = await shift.findById(req.params.id);
        if (!shiftedit) {
            return res.status(404).json({ msg: 'El turno no existe.' });
        }
     
        shiftedit = await shift.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'El turno fue actualizado.', shiftedit});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

