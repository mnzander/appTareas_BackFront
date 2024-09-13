const Users = require("../models/usersModel"); //Traemos el modelo de usuario
const bcrypt = require("bcrypt"); //Traemos bcrypt
const mongoose = require("mongoose"); //Traemos mongoose
const jwt = require("jsonwebtoken"); //Traemos jsonwebtoken
const { generateToken } = require("../utils/utils"); //Traemos la funcion generateToken

const registerUser = async (req, res) => { //REGISTRO DE USUARIOS
    try{
        const { name, email, password, role } = req.body; //Los campos de registro son el body
        const user = new Users({ //Declaramaos el nuevo usuario con el modelo de usuarios
            name: name,
            email: email,
            password: await bcrypt.hash(password, 10), //Añadimos el hasheo de contraseña
            role: role,
        });

        await user.save(); //Guardamos el usuario
        res.status(200).json({ status: "Success", data: user });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: "Failed", message: "El email ya existe", error: error.message });
        } else {
            res.status(400).json({ status: "Error", message: "Error al registrar el usuario", error: error.message });
        }
    }
};

const loginUser = async (req, res) => { //LOGIN DE USUARIOS
    try{
        const { email, password } = req.body; //Los campos de login son el body
        const user = await Users.findOne({ email: email }); //Declaramos la busqueda del usuario por su email

        if (user) { //Si existe el usuario
            const pwd = await bcrypt.compare(password, user.password); //Compara la contraseña del usuario con el valor del campo del formulario
            if (pwd) { //Si coinciden
                const payload = { //Generamos el objeto payload con la informacion
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };

                const token = generateToken(payload, false); //Guardamos el token llamando a la funcion generateToken con la info del usuario y pasandole false(para isRefresh)
                const token_refresh = generateToken(payload, true); //Guardamos el tokenRefresh llamando a la funcion generateToken con la info del usuario y pasandole true(para isRefresh)
                return res.status(200).json({ status: "success", data: user, token: token, token_refresh: token_refresh });

            } else {
                return res.status(200).json({ status: "error", message: "The email and password didn't match..." });
            }

        } else {
            return res.status(200).json({ status: "error", message: "The email and password didn't match..." });
        }
    } catch (error) {
        res.status(400).json({ status: "error", message: "Error doing the login...", error: error.message });
    }
};

module.exports = { registerUser, loginUser }; //Exportamos las funciones para el router