require('dotenv').config();
const express  = require('express');
const bcryptjs = require('bcryptjs');
const cors     = require('cors');
const mongoose = require('./database');
const jwt      = require('jsonwebtoken');

//Modelos 
const product = require('./models/ecommerce/ad-ecommerce/Products');
const payment = require('./models/ecommerce/ad-ecommerce/Payments');
const cartproduct = require('./models/ecommerce/ad-ecommerce/CartProducts');
const category    = require('./models/ecommerce/ad-ecommerce/Category');
const user    = require('./models/users/Users');


// Crear el servidor
const app = express();

// Puerto de la App
const PORT = process.env.PORT ;

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing
app.use(cors());

// Definimos las RUTAS
// Iniciar la App
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});



// Usuario
//Autenticar Usuaro
app.post('/auth', async (req, res) => {
    
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
   

});


// Crear Usuario
app.post('/usuarios', async (req, res) => {
    
   
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

});


// Agrega un Producto
app.post('/addProduct', async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let products = new product(req.body);
        // Guardamos el Producto en la BD
        await products.save();
        res.json({ msg: 'Producto creado correctamente.', products });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});


// Lista los Productos
app.get('/ListProducts', async (req, res) => {
    try {
        const products = await product.find();
        res.json({ products });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
});


//Listar Producto Por Id
app.get('/ListCategoryById/:id', async (req, res) => {
    try {

        
        // Controlar la categoria
        const categorys = await category.findById(req.params.id);
        if(!categorys){
            res.status(400).json({ msg: 'La Categoria no existe.'});
        }

        // Buscar y listar los Productos
        const products = await product.find({ category: categorys._id });
        res.json({ products });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.'});
    }
});

// Elimina un Producto
app.delete('/product/:id', async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Verificar que el Producto exista
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Eliminar
        await proddel.remove();
        res.json({ msg: 'El Producto fue eliminado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});


// Modifica un Producto
app.put('/product/:id', async (req, res) => {
    try {
        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Verificar que el Producto exista
        let proddel = await product.findById(req.params.id);
        if (!proddel) {
            return res.status(404).json({ msg: 'El Producto no existe.' });
        }
        // Editar 
        proddel = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: 'El Producto fue actualizado.', proddel});
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});


//Payments Details 
// Agrega un Pago
app.post('/addPayment', async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let payments = new payment(req.body);
        // Guardamos el Producto en la BD
        await payments.save();
        res.json({ msg: 'Pago creado correctamente.', payments });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});

//CartProduct Details
//Agrega Carrito
app.post('/addCardProduct', async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let carproduct = new cartproduct(req.body);
        // Guardamos el Producto en la BD
        await carproduct.save();
        res.json({ msg: 'Carrito creado correctamente.', carproduct });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});


app.get('/CardProducts', async (req, res) => {
    try {
        const carproducts = await cartproduct.find().populate({path:'users'});
        res.json({ carproducts });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
});


//Ctegory
//AddCategory
app.post('/addCategory', async (req, res) => {
    console.log(req.body);
    try {
        // Creamos el Producto
        let categorys = new category(req.body);
        // Guardamos el Producto en la BD
        await categorys.save();
        res.json({ msg: 'Categoria creado correctamente.', categorys });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Hubo un error.' });
    }
});

//GetCategory
app.get('/ListCategory', async (req, res) => {
    try {
        const categorys = await category.find();
        res.json({ categorys });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Hubo un error' });
    }
});




