const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const mongoose  = require('./database');

//Controller Usuario
const userController = require('./controllers/authController');
const auth = require('./middlewares/auth');

//Controllers Ecommerce
const cartProductController = require('./controllers/cartProductController');
const categoryController = require('./controllers/categoryController');
const paymentsController = require('./controllers/paymentsController');
const productController = require('./controllers/productController');
const purchaseController = require('./controllers/purchaseController');

//Controllers Shifts 
const shiftsController = require('./controllers/shiftsController');
const specieController = require('./controllers/specieController');
const specialityController = require('./controllers/specialityController');




//ROUTES USERS
router.post('/users/',
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('email', 'Ingrese un email válido.').isEmail(),
        check('password', 'El email es obligatorio.').not().isEmpty(),
        check('password', 'El password debe ser mínimo de 6 caracteres.').isLength({
            min: 6
        })
    ]
    , userController.users
);

router.post('/auth/',
    [
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('password', 'El password es obligatorio.').not().isEmpty()
    ]
    , userController.auth
);


//ROUTES PRODUCTS

//AGREGA PRODUCTO
router.post('/addProduct',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , productController.addProduct
);

//LISTA UN PRODUCTO
router.get('/listProducts',
    //auth,
    productController.listProducts
);

//LISTA UN PRODUCTO POR ID 
router.get('/listProductByCategory/:id',
    //auth,
    productController.listProductByCategory
);

//ELIMINA UN PRODUCTO
router.delete('/deleteProduct/:id',
    //auth,
    productController.deleteProduct
);

//EDITA UN PRODUCTO
router.put('/editProduct/:id',
    //auth,
    [
        //check('nombretarea', 'El titulo es obligatorio.').notEmpty(),
        //check('nombreetiqueta', 'La Etiqueta no es válida.').isMongoId()
    ],
    productController.editProduct
);

//ROUTES PAYMENTS 
router.post('/addPayment',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , paymentsController.addPayment
);


//ROUTES CARTPRODUCT
router.post('/addCardProduct',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , cartProductController.addCardProduct
);

//LISTAR CARRITO
router.get('/ListCardProduct',
    //auth,
    cartProductController.listcardProducts
);

//ROUTES CATEGORY
router.post('/addCategory',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , categoryController.addCategory
);

//LISTAR CATEGORIA
router.get('/listCategory/',
    //auth,
    categoryController.listCategory
);

//EDITAR CATEGORIA
router.put('/editCategory/:id',
    //auth,
    categoryController.editCategory
);

//COMPRA 
//GUARDA UNA COMPRA
router.post('/addPurchase',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , purchaseController.addPurchase
);

//LISTA UNA COMPRA
router.get('/listPurchase',
    //auth,
    purchaseController.listPurchase
);

//EDITA UNA COMPRA 
router.delete('/deletePurchase/:id',
    //auth,
    purchaseController.deletePurchase
);

//SHIFTS 
//AGREGA SHIFTS
router.post('/addShifts',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    ,shiftsController.addShifts
);

//LISTA SHIFTS
router.get('/listShifts',
    //auth,
    shiftsController.listShifts
);

//LIST SHIFTS BY USR
router.get('/listShiftsByUsr/:id',
    //auth,
    shiftsController.listShiftsByUsr
); 

//AGREGA SPECIES
router.post('/addSpecie',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , specieController.addSpecie
);

//LISTA ESPECIES
router.get('/listSpecie',
    //auth,
    specieController.listSpecies
);

//AGREGA SPECIALITY
router.post('/addSpeciality',
    /*auth,*/
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , specialityController.addSpeciality
);

//LISTA ESPECIES
router.get('/listSpeciality',
    //auth,
    specialityController.listSpecialitys
);




module.exports = router;
