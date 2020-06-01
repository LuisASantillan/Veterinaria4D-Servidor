const express = require('express');
const router = express.Router();
const auth   = require('./middlewares/auth');
const { check } = require('express-validator');

//BLOQUE PRODUCTOS ******************************************************************
router.post('/usuarios/',
    [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('email', 'Ingrese un email válido.').isEmail(),
        check('password', 'El email es obligatorio.').not().isEmpty(),
        check('password', 'El password debe ser mínimo de 6 caracteres.').isLength({
            min: 6
        })
    ]
    , usuarioController.crearUsuario
);

