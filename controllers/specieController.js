const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

const specie = require('../models/shifts/Specie');

//AddShifts
exports.addSpecie = async (req, res) => {
   
    try {
        
        let species = await specie.find({name:req.body.name}); 
        if(species.length > 0){
           return res.status(400).json({ msg: 'Especie ya Existe' , success:false });
        }

        species = new specie(req.body);
        await species.save();
        res.json({ msg: 'Especie Guardada', species , success:true });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' , success:false });
    }
};

// Lista los Especies
exports.listSpecies = async (req, res) => {
    try {
        const species = await specie.find();
        res.json({ species , success:true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' , success:false });
    }
};

exports.deleteSpecie = async (req, res) => {
    try {
      
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Specie no Existe' });
        }
       
        let speciedel = await specie.findById(req.params.id);
        if (!speciedel) {
            return res.status(404).json({ msg: 'La Specie no Existe' });
        }
  
        await speciedel.remove();
        res.json({ msg: 'El Specie fue eliminado correctamente.', success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' , success:false });
    }
};
