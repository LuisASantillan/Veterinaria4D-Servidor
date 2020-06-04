const category = require('../models/ecommerce/ad-ecommerce/Category');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


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