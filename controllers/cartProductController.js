const  cartproduct  = require('../models/ecommerce/ad-ecommerce/CartProducts');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


exports.addCardProduct =  async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let carproduct = new cartproduct(req.body);
        // Guardamos el Producto en la BD
        await carproduct.save();
        res.json({ msg: 'Carrito creado correctamente.', carproduct });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


exports.listcardProducts =  async (req, res) => {
    try {
        const carproducts = await cartproduct.find().populate({path:'users'});
        res.json({ carproducts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};