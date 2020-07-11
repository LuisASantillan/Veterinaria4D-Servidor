const purchase = require('../models/ecommerce/ad-ecommerce/Purchase');
const cartProduct = require('../models/ecommerce/ad-ecommerce/CartProduct');
const user = require('../models/users/User');


const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');


// Agrega una Compra
exports.addPurchase = async (req, res) => {
    console.log(req.body);
    try {

        let purchases = new purchase(req.body);
        await purchases.save();
        res.json({ msg: 'Venta guardada', purchases });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


// Lista una Compra
exports.listPurchase = async (req, res) => {

    let { page, limit } = req.query;

    const purchases = await purchase.find();
    const listpurchase = purchase.aggregate(
        [

            {
                $lookup:
                {
                    from: 'cardproducts',
                    localField: '_id',
                    foreignField: 'purchase',
                    as: 'cartproducts'
                }
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;

            res.json({
                data,
                totalPages: Math.ceil(purchases.length / limit),
                currentPage: page,
                success: true
            });
        }
    )
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

};


// Lista una Compra por usuario
exports.listPurchaseByUsr = async (req, res) => {

    let { page, limit } = req.query;
    console.log(req.query);

    const users = await user.findById(req.params.id);
    if (!users) {
        res.status(400).json({ msg: 'El Usuario no existe', success: false });
    }

    const purchases = await purchase.find({ user: users._id });
    purchase.aggregate(
        [
            {
                $match: {
                    user: users._id
                }
            },
            {
                $lookup:
                {
                    from: 'cardproducts',
                    localField: '_id',
                    foreignField: 'purchase',
                    as: 'cartproducts'
                }
            },
            {
                $lookup:
                {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'users'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;

            res.json({
                data,
                totalPages: Math.ceil(purchases.length / limit),
                currentPage: page,
                success: true
            });

            console.log(data)

        }
    )
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
};


// Elimina una Compra
exports.deletePurchase = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Compra no existe' });
        }

        let purchasedel = await purchase.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'La Compra no existe no existe.' });
        }

        await purchasedel.remove();
        res.json({ msg: 'La compra fue eliminada' });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


