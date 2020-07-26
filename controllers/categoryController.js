const category = require('../models/ecommerce/ad-ecommerce/Category');
const bcryptjs = require('bcryptjs');
const mongoose = require('../database');

//Ctegory
//AddCategory
exports.addCategory = async (req, res) => {

    try {
        let categorys = await category.find({ name: req.body.name });
        if (categorys.length > 0) {
            return res.json({ msg: 'Categoria Existente.', categorys, success: false });
        }

        categorys = new category(req.body);
        await categorys.save();
        res.json({ msg: 'Categoria creado correctamente.', categorys, success: true });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.', success: false });
    }
};

//GetCategory
exports.listCategory = async (req, res) => {
    try {
        const categorys = await category.find();
        res.json({ categorys, success: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error', success: false });
    }
};

// Modifica una Categoria
exports.editCategory = async (req, res) => {
    try {

        let categorys = await category.find({ name: req.body.name });
        if (categorys.length > 0) {
            return res.json({ msg: 'Categoria Existente.', categorys, success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Categoria No Existe' });
        }
        let catmod = await category.findById(req.params.id);
        if (!catmod) {
            return res.status(404).json({ msg: 'La Categoria No Existe' });
        }
        catmod = await category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: 'La Categoria fue modificada', catmod, success: true });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.', success: false });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Categoria no Existe' });
        }
        let categorydel = await category.findById(req.params.id);
        if (!categorydel) {
            return res.status(404).json({ msg: 'La Categoria no Existe' });
        }
        await categorydel.remove();
        res.json({ msg: 'El categoria fue eliminada correctamente.', success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.', success: false });
    }
};