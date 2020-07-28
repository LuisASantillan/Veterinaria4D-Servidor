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
        check('password', 'El password es obligatorio.').not().isEmpty(),
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

router.get('/listUsrsbyId/:id',
    auth,
    userController.getusrbyId
);

//ROUTES PRODUCTS
router.post('/addProduct',
    auth,
    [
        
        check('title', 'El nombre es obligatorio.').notEmpty(),
        check('price', 'El precio es obligatorio.').notEmpty(),
        check('stock', 'El stock es obligatorio.').notEmpty(),
        check('detail', 'El detalle es obligatorio.').notEmpty(),
        check('urlimg', 'La Imagen es obligatoria.').notEmpty(),
        check('category', 'La categoria es obligatoria.').notEmpty(),
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
        check('title', 'El nombre es obligatorio.').notEmpty(),
        check('price', 'El precio es obligatorio.').notEmpty(),
        check('stock', 'El stock es obligatorio.').notEmpty(),
        check('detail', 'El detalle es obligatorio.').notEmpty(),
        check('urlimg', 'La URL es obligatoria.').notEmpty(),
        check('category', 'La categoria es obligatoria.').notEmpty(),
    ],
    productController.editProduct
);

//ROUTES PAYMENTS 
router.post('/addPayment',
    auth,
    [
        check('cvc', 'El Codigo de tarjeta es obligatorio.').notEmpty(),
        check('expiry', 'La expiracion es obligatorio.').notEmpty(),
        check('number', 'El numero es obligatorio.').notEmpty(),
    ]
    , paymentsController.addPayment
);


//ROUTES CARTPRODUCT
router.post('/addCardProduct',
    auth,
    [
        check('title', 'El nombre es obligatorio.').notEmpty(),
        check('knt', 'La Cantidad es obligatorio.').notEmpty(),
        check('price', 'La Cantidad es obligatorio.').notEmpty(),
        check('payment', 'El pago es obligatorio.').notEmpty(),
        check('purchase', 'La Compra es obligatorio.').notEmpty(),

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
        check('name', 'El nombre es obligatorio.').notEmpty() , 
        check('detail', 'El Detalle es obligatorio.').notEmpty()
    ]
    , categoryController.addCategory
);

router.get('/listCategory/',
    categoryController.listCategory
);

router.put('/editCategory/:id',
    auth,
    [
        check('name', 'El nombre es obligatorio.').notEmpty() , 
        check('detail', 'El Detalle es obligatorio.').notEmpty()
    ], 
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
        check('totalprice', 'El Importe es obligatorio.').notEmpty(),
        check('address', 'El Domicilio es obligatorio.').notEmpty()
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
        check('petname', 'El nombre es obligatorio.').notEmpty() ,
        check('dateshifts', 'El dia es obligatorio.').notEmpty() ,
        check('speciality', 'La Especialidad es obligatoria.').notEmpty() ,
        check('specie', 'La Especie es obligatoria.').notEmpty() ,
        check('timeshifts', 'El Horario es Obligatorio').notEmpty() ,
        
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

router.get('/listShiftsbydatetime/:date/:time/:speciality',
    auth,
    shiftsController.listShiftsbydatetime
); 

//ROUTES SPECIES
router.post('/addSpecie',
    auth,
    [
        check('name', 'El nombre es obligatorio.').notEmpty()
    ]
    , specieController.addSpecie
);

router.get('/listSpecie',
    auth,
    specieController.listSpecies
);

router.delete('/deleteSpecie/:id',
    auth,
    specieController.deleteSpecie
);

//ROUTES SPECIALITY
router.post('/addSpeciality',
    auth,
    [
        check('name', 'El nombre es obligatorio.').notEmpty()
    ]
    , specialityController.addSpeciality
);

router.get('/listSpeciality',
    auth,
    specialityController.listSpecialitys
);

router.delete('/deleteSpeciality/:id',
    auth,
    specialityController.deleteSpecialitys
);


module.exports = router;
