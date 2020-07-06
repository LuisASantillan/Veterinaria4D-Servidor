const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Leer token del header
    const token = req.header('x-auth-token');

    // Si no existe el token
    if(!token){
        res.status(401).json({ msg: 'No hay token, acceso denegado.' , success:false});
    }

    // Validar token
    try {
        const payload = jwt.verify(token, process.env.SECRET);
        req.usuario = payload.usuario;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token no válido, acceso denegado.' , success:false});
    }
};