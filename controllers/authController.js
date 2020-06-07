const  cartproduct  = require('../models/users/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const mongoose = require('../database');

// Usuario
//Autenticar Usuaro
exports.auth = async (req, res) => {
    
    // Extraer email y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let users = await user.findOne({ email });
        if(!users){
            console.log('Email no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.'})
        }

        // Verificar la contraseña
        const passCorrecto = await bcryptjs.compare(password, users.password);
        if(!passCorrecto){
            console.log('Password no válido.');
            res.status(400).json({ msg: 'El email o contraseña no son válidos.'})
        }

        // TODO OK

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: users.id
            }
        };
 
        // Firmar token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        }, (error, token) => {
            if(error) throw error;
        
            // Mensaje de confirmación
            res.json({ users , token });
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.'});
    }
   

};


// Crear Usuario
exports.users = async (req, res) => {
    
   
    // Extraer email y password
    const { email, password } = req.body
    
    try {
        let users = await user.findOne({ email });

        if(users){
            return res.status(400).json({ msg: 'El email ingresado ya esta usado.'});
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
                id: usuario.id
            }
        };

        // Firmar el token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: '1h'
        }, (error, token) => {
            if(error) throw error;
            res.json({ msg: 'Usuario creado correctamente', token , users });
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error'});
    }

};
