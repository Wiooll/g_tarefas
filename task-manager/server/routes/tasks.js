import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.createTask({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: 'todo'
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
