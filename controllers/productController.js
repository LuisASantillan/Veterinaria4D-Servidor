const product = require('../models/ecommerce/ad-ecommerce/Products');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');


// Agrega un Producto
exports.addProduct = async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let products = new product(req.body);
        // Guardamos el Producto en la BD
        await products.save();
        res.json({ msg: 'Producto creado correctamente.', products });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


// Lista los Productos
exports.listProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.json({ products });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
};


//Listar Producto Por Id
exports.listProductByCategory =  async (req, res) => {
    try {

        
        // Controlar la categoria
        const categorys = await category.findById(req.params.id);
        if(!categorys){
            res.status(400).json({ msg: 'La Categoria no existe.'});
        }

        // Buscar y listar los Productos
        const products = await product.find({ category: categorys._id });
        res.json({ products });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.'});
    }
};

// Elimina un Producto
exports.deleteProduct = async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Verificar que el Producto exista
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Eliminar
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
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Verificar que el Producto exista
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Editar 
        proddel = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'El Producto fue actualizado.', proddel});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};