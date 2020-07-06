const purchase    = require('../models/ecommerce/ad-ecommerce/Purchase');
const cartProduct = require('../models/ecommerce/ad-ecommerce/CartProducts');
const user        = require('../models/users/Users');


const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');


// Agrega una Compra
exports.addPurchase = async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let purchases = new purchase(req.body);
        // Guardamos el Producto en la BD
        await purchases.save();
        res.json({ msg: 'Venta guardada', purchases });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


// Lista una Compra
exports.listPurchase = async (req, res) => {

    let  { page = 1 , limit = 100 } = req.query;
    //page = parseInt(page); 

    //const carproducts = await cartProduct.find().populate({path:'users'});

    purchase.paginate().then(function(result) {
        // result.docs - array of plain javascript objects
        // result.limit - 20
        console.log(result.docs)
        console.log(result.limit)
      });

    const purchases    = await purchase.find();
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
                  localField: 'users',
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
                currentPage: page , 
                success:true 
              });
        }
    )
    .skip((page - 1) * limit)
    .limit(limit * 1)
    .exec();

    


};


// Lista una Compra por usuario
exports.listPurchaseByUsr = async (req, res) => {

    const users = await user.findById(req.params.id);
    if(!users){
        res.status(400).json({ msg: 'El Usuario no existe' , success:false});
    }

    //const carproducts = await cartProduct.find().populate({path:'users'});
    purchase.aggregate(
        [
            {
                $match: {
                    users: users._id
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
                  localField: 'users',
                  foreignField: '_id',
                  as: 'users'
                }
            },
        ],

        function (err, data) {

            if (err)
                throw err;
            res.json({data  , success:true});
        }
    )
};


// Elimina una Compra
exports.deletePurchase = async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'La Compra no existe' });
        }
        // Verificar que el Producto exista
        let purchasedel = await purchase.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'La Compra no existe no existe.' });
        }
        // Eliminar
        await purchasedel.remove();
        res.json({ msg: 'La compra fue eliminada' });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


