const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);

        const savedTask = await task.save();

        res.status(201).json(savedTask);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        res.status(200).json({
            message: "Tâche supprimée avec succès"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTaskStatus,
    deleteTask
};