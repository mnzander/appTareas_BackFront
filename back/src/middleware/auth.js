const jwt = require("jsonwebtoken");
const Users = require("../models/usersModel");

const authMiddleware = async (req, res, next) => {
    const token = req.header("auth"); //Declaramos el token y que el header tendra el nombre AUTH
    if (!token) return res.status(401).send("Access denied..."); //Si no hay token denegamos acceso

    try{
        const payload = jwt.verify(token, process.env.TOKEN_SECRET); //Verificamos el token usando JWT
        req.user = await Users.findById(payload.userId); //Guardar la informacion del payload

        if (!req.user) { //Si no se encontro el usuario
            return res.status(404).json({ message: "User not found..." }); //Devuelve el error
        }

        next(); //Sigue adelante
    } catch (error) { //Si la verificacion falla
        try{
            const payload = jwt.verify(token, process.env.TOKEN_REFRESH_SECRET); //Intentalo con el token refresh
            req.user = await Users.findById(payload.userId);

            if (!req.user) { //Si no se encontro el usuario
                return res.status(404).json({ message: "User not found..." }); //Devuelve el error
            }

            next(); //Sigue adelante

        } catch (error) {
            console.error('Error verifying token:', error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }
};

// const isAdmin = (req, res, next) => {
//     const user = req.user;

//     if (user && user.role === "admin") {
//         next();
//     } else {
//         return res.status(403).json({ status: "failed", message: "Access unauthorized..." });
//     }
// };

module.exports = { authMiddleware } //Exportar la funcion