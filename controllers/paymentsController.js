const  payment  = require('../models/ecommerce/ad-ecommerce/Payments');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

exports.addPayment = async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let payments = new payment(req.body);
        // Guardamos el Producto en la BD
        await payments.save();
        res.json({ msg: 'Pago creado correctamente.', payments });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};