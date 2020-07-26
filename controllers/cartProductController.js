const cartproduct = require('../models/ecommerce/ad-ecommerce/CartProduct');
const product = require('../models/ecommerce/ad-ecommerce/Product');

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');
const { find } = require('../models/ecommerce/ad-ecommerce/CartProduct');

exports.addCardProduct = async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let carproduct = new cartproduct(req.body);
        // Guardamos el Producto en la BD
        await carproduct.save();

        //Update Products
        let products = await product.find({ title: req.body.title });
        console.log(req.body);
        if (products.length > 0) {
            console.log("---body" + req.body.knt);
            console.log(products[0]);
            products[0].stock = products[0].stock*1 - req.body.knt*1;
            console.log(products[0]);
            proddel = await product.findByIdAndUpdate(products[0]._id, products[0], { new: true });
        }
        res.json({ msg: 'Carrito creado correctamente.', carproduct });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

exports.listcardProducts = async (req, res) => {
    try {
        const carproducts = await cartproduct.find().populate({ path: 'users' });
        res.json({ carproducts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};