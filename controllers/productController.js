const product = require('../models/ecommerce/ad-ecommerce/Product');
const category = require('../models/ecommerce/ad-ecommerce/Category');

const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');


// Agrega un Producto
exports.addProduct = async (req, res) => {
    console.log(req.body);
    try {

        let products = new product(req.body);
     
        await products.save();
        res.json({ msg: 'Producto creado correctamente.', products, success: true });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.', success: false });
    }
};


// Lista los Productos
exports.listProducts = async (req, res) => {
    try {
        const products = await product.find();
        if (products.length > 0) {
            res.json({ products, success: true });
        }else {
            res.json({ products, success: false });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error', success: false });
    }
};


//Listar Producto Por Id
exports.listProductByCategory = async (req, res) => {
    try {

        const categorys = await category.findById(req.params.id);
        if (!categorys) {
            res.status(400).json({ msg: 'La Categoria no existe.' });
        }

        const products = await product.find({ category: categorys._id });
        if (products.length > 0) {
            res.json({ products, success: true });
        }else {
            res.json({ products, success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.', success: false });
    }
};

// Elimina un Producto
exports.deleteProduct = async (req, res) => {
    try {
    
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
    
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
    
        await proddel.remove();
        res.json({ msg: 'El Producto fue eliminado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


// Modifica un Producto
exports.editProduct = async (req, res) => {
    try {
     
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
       
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
    
        proddel = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'El Producto fue actualizado.', proddel });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};