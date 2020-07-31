const user = require('../models/users/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');
const jwt = require('jsonwebtoken');

// Usuario
//Autenticar Usuaro
exports.auth = async (req, res) => {

    const { email, password } = req.body;

    try {

        let users = await user.findOne({ email });
        if (!users) {
            console.log('Email no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.', success: false })
        }

        const passCorrecto = await bcryptjs.compare(password, users.password);
        if (!passCorrecto) {
            console.log('Password no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.', success: false })
        }

        const payload = {
            usuario: {
                id: users.id
            }
        };

        var datausr = {};
        datausr.isadmin = users.isadmin;
        datausr.nombre = users.nombre;
        datausr._id = users._id;

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '365d'
        }, (error, token) => {
            if (error) throw error;
            res.json({ datausr, token, success: true });
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};


exports.users = async (req, res) => {

    const { email, password } = req.body

    try {
        let users = await user.findOne({ email });

        if (users) {
            return res.status(400).json({ msg: 'El email ingresado ya esta usado.', success: false });
        }

        users = new user(req.body);
        const salt = await bcryptjs.genSalt(10);
        users.password = await bcryptjs.hash(password, salt);

        await users.save();

        const payload = {
            usuario: {
                id: users.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '365d'
        }, (error, token) => {
            if (error) throw error;
            res.json({ msg: 'Usuario creado correctamente', token, users, success: true });
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error', success: false });
    }

};


// Modifica un Usuario
exports.editusr = async (req, res) => {
    try {

        let users = await user.find({ email: req.body.email });
        if (users.length > 0) {
            if (users[0]._id.toString() !== req.params.id) {
                return res.status(400).json({ msg: 'Usuario ya Existe', success: false });
            }
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El usuario no existe', success: false });
        }

        let usrmod = await user.findById(req.params.id);
        if (!usrmod) {
            return res.status(404).json({ msg: 'El usuario no existe', success: false });
        }

        if (usrmod.password == req.body.password) {

        } else {
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);
        }

        if (req.body.isadmin == false) {
            users = await user.find({isadmin: true});
            if (users.length == 1) {
                return res.status(404).json({ msg: 'Un Usuario al menos debe ser admin', success: false });
            }
        }

        usrmod = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ msg: 'Usuario actualizado', usrmod, success: true });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

exports.getusr = async (req, res) => {
    try {
        const users = await user.find();
        res.json({ users, success: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error', success: false });
    }
};


exports.getusrbyId = async (req, res) => {
    try {
        const users = await user.find({ _id: req.params.id });
        res.json({ users, success: true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error', success: false });
    }
};
