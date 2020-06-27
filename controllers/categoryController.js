const category = require('../models/ecommerce/ad-ecommerce/Category');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');


//Ctegory
//AddCategory
exports.addCategory = async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let categorys = new category(req.body);
        // Guardamos el Producto en la BD
        await categorys.save();
        res.json({ msg: 'Categoria creado correctamente.', categorys });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
} ; 

//GetCategory
exports.listCategory = async (req, res) => {
    try {
        const categorys = await category.find();
        res.json({ categorys });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};

// Modifica una Categoria
exports.editCategory = async (req, res) => {
    try {

        console.log(req.params.id)
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Categoria No Existe' });
        }
        // Verificar que el Producto exista
        let catmod = await category.findById(req.params.id);
        if (!catmod) {
            return res.status(404).json({ msg: 'La Categoria No Existe' });
        }
        // Editar 
        catmod = await category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'La Categoria fue modificada', catmod});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Categoria no Existe' });
        }
        // Verificar que el Producto exista
        let categorydel = await category.findById(req.params.id);
        if (!categorydel) {
            return res.status(404).json({ msg: 'La Categoria no Existe' });
        }
        // Eliminar
        await categorydel.remove();
        res.json({ msg: 'El categoria fue eliminado correctamente.', success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' , success:false });
    }
};