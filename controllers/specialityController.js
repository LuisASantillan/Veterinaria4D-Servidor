const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const speciality = require('../models/shifts/Speciality');

//AddShifts
exports.addSpeciality = async (req, res) => {
   
    try {
        
        let specialitys = new speciality(req.body);
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
        res.json({ specialitys , success:true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' , success:false });
    }
};

exports.deleteSpecialitys = async (req, res) => {
    try {
      
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Especialidad no Existe' });
        }
       
        let specialitys = await speciality.findById(req.params.id);
        if (!specialitys) {
            return res.status(404).json({ msg: 'La Especialidad no Existe' });
        }
  
        await specialitys.remove();
        res.json({ msg: 'El Especialidad fue eliminado correctamente.', success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' , success:false });
    }
};