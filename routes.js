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

router.put('/auth/:id',
    auth,
    [
        check('email', 'El email es obligatorio.').not().isEmpty(),
        check('password', 'El password es obligatorio.').not().isEmpty()
    ]
    , userController.editusr
);

router.get('/listUsrs',
    auth,
    userController.getusr
);


//ROUTES PRODUCTS

router.post('/addProduct',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , productController.addProduct
);

router.get('/listProducts',
    productController.listProducts
);

router.get('/listProductByCategory/:id',
    productController.listProductByCategory
);

router.delete('/deleteProduct/:id',
    auth,
    productController.deleteProduct
);

router.put('/editProduct/:id',
    auth,
    [
        //check('nombretarea', 'El titulo es obligatorio.').notEmpty(),
        //check('nombreetiqueta', 'La Etiqueta no es válida.').isMongoId()
    ],
    productController.editProduct
);

//ROUTES PAYMENTS 
router.post('/addPayment',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , paymentsController.addPayment
);


//ROUTES CARTPRODUCT
router.post('/addCardProduct',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , cartProductController.addCardProduct
);

//LISTAR CARRITO
router.get('/ListCardProduct',
    auth,
    cartProductController.listcardProducts
);

//ROUTES CATEGORY
router.post('/addCategory',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , categoryController.addCategory
);

router.get('/listCategory/',
    categoryController.listCategory
);

router.put('/editCategory/:id',
    auth,
    categoryController.editCategory
);

router.delete('/deleteCategory/:id',
    auth,
    categoryController.deleteCategory
);


//ROUTES COMPRA 
router.post('/addPurchase',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , purchaseController.addPurchase
);

router.get('/listPurchase',
    auth,
    purchaseController.listPurchase
);

router.delete('/deletePurchase/:id',
    auth,
    purchaseController.deletePurchase
);

router.get('/listPurchaseByUsr/:id',
    auth,
    purchaseController.listPurchaseByUsr
);


//ROUTES SHIFTS 

router.post('/addShifts',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    ,shiftsController.addShifts
);

router.get('/listShifts',
    auth,
    shiftsController.listShifts
);

router.get('/listShiftsByUsr/:id',
    auth,
    shiftsController.listShiftsByUsr
); 

router.put('/editShifts/:id',
    auth,
    shiftsController.editShifts
);

//ROUTES SPECIES
router.post('/addSpecie',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , specieController.addSpecie
);

router.get('/listSpecie',
    auth,
    specieController.listSpecies
);

//ROUTES SPECIALITY
router.post('/addSpeciality',
    auth,
    [
        //check('nombrecategoria', 'El nombre es obligatorio.').notEmpty()
    ]
    , specialityController.addSpeciality
);

router.get('/listSpeciality',
    auth,
    specialityController.listSpecialitys
);


module.exports = router;
