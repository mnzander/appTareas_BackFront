const { loginUser, registerUser } = require("../controllers/usersController");

const router = require("express").Router(); // Router para gestionar operaciones de tareas

router.post("/register", registerUser); //Crear usuario
router.post("/login", loginUser); //Crear login

module.exports = router; //Exportamos el router para usarlo en index.js