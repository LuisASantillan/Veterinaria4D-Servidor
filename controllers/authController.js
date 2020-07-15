const user = require('../models/users/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');
const jwt = require('jsonwebtoken');

// Usuario
//Autenticar Usuaro
exports.auth = async (req, res) => {

    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let users = await user.findOne({ email });
        if (!users) {
            console.log('Email no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.', success: false })
        }

        // Verificar la contraseña
        const passCorrecto = await bcryptjs.compare(password, users.password);
        if (!passCorrecto) {
            console.log('Password no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.', success: false })
        }

        // TODO OK

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: users.id
            }
        };

        var datausr = {} ; 
                datausr.isadmin = users.isadmin ; 
                datausr.nombre  = users.nombre ; 
                datausr._id     = users._id    ; 

        // Firmar token
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


// Crear Usuario
exports.users = async (req, res) => {


    // Extraer email y password
    const { email, password } = req.body

    try {
        let users = await user.findOne({ email });

        if (users) {
            return res.status(400).json({ msg: 'El email ingresado ya esta usado.' });
        }

        // Creamos el usuario
        users = new user(req.body);

        // Hashear password
        const salt = await bcryptjs.genSalt(10);
        users.password = await bcryptjs.hash(password, salt);

        // Guardamos el usuario en la BD
        await users.save();

        // Creamos payload
        const payload = {
            usuario: {
                id: users.id
            }
        };

        // Firmar el token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '365d'
        }, (error, token) => {
            if (error) throw error;
            res.json({ msg: 'Usuario creado correctamente', token, users, success: true });
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error' , success:false });
    }

};


// Modifica un Usuario
exports.editusr = async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El usuario no existe', success: false });
        }
        // Verificar que el Producto exista
        let usrmod = await user.findById(req.params.id);
        if (!usrmod) {
            return res.status(404).json({ msg: 'El usuario no existe', success: false });
        }

        if (usrmod.password == req.body.password) {

        } else {
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);
        }

        usrmod = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'Usuario actualizado', usrmod, success: true });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
};

// Modifica un Usuario
exports.getusr = async (req, res) => {
    try {
        const users = await user.find();
        res.json({ users , success:true });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' , success:false });
    }
};
