const { getTasks, createTasks, updateTaskById, deleteTaskById } = require("../controllers/tasksController");
const { authMiddleware } = require("../middleware/auth");

const router = require("express").Router(); // Router para gestionar operaciones de tareas

router.use(authMiddleware); //Todos usan el middleware

router.post("/", createTasks); //Crear tarea
router.get("/", getTasks); //Traer tareas
router.put("/:id", updateTaskById); //Editar tareas
router.delete("/:id", deleteTaskById); //Borrar tareas

module.exports = router; //Exportamos el router para usarlo en index.js