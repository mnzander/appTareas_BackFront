const Tasks = require("../models/tasksModel")

const createTasks = async (req, res) => {
    try{
        const newData = req.body;

        if(!req.user) {
            return res.status(401).json({ message: "User not authenticated..." });
        }
        
        const newTask = await Tasks({
            name: newData.name,
            description: newData.description,
            relevance: newData.relevance,
            creatorId: req.user._id
        });
        await newTask.save();
        res.status(201).json({ status: "success", data: newTask, error: null });
    } catch (error) {
        res.status(400).json({ status: "error", data: null, error: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Tasks.find({ creatorId: userId });
        if (tasks.length === 0) {
            return res.status(404).json({ status: "error", message: "No se encontraron tareas para este usuario" });
        }
        res.status(200).json({ status: "success", data: tasks, error: null });
    } catch (error) {
        res.status(400).json({ status: "error", data: null, error: error.message });
    }
};

const updateTaskById = async (req, res) => {
    try{
        const id = req.params.id;
        const task = await Tasks.findById(id);
        if (task) {
            const newData = {
                name: req.body.name || task.name,
                description: req.body.description || task.description,
                relevance: req.body.relevance || task.relevance,
                creatorId: req.user._id
            };

            const updatedTask = await Tasks.findByIdAndUpdate(id, newData, { new: true });

            if (!updatedTask) res.status(404).json({ status: "error", message: "La tarea no existe o no se pudo actualizar" });
        } else {
            res.status(404).json({ status: "error", message: "La tarea no existe..." }); 
        }
    } catch (error) {
        res.status(400).json({ status: "error", data: null, error: error.message });
    }
};

const deleteTaskById = async (req, res) => {
    try{
        const id = req.params.id;
        if (id) {
            await Tasks.findByIdAndDelete(id);
            res.status(200).json({ status: "error", data: null, error: null });
        } else res.status(400).json({ status: "error", message: "The task does not exist" });  
    } catch (error) {
        res.status(400).json({ status: "error", data: null, error: error.message }); 
    }
};

module.exports = { createTasks, getTasks, updateTaskById, deleteTaskById };