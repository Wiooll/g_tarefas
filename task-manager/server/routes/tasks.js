import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Registrar usuário no Parse server
router.post('/register', async (req, res) => {
  try {
    const user = await Parse.User.signUp(req.body.username, req.body.password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Autenticar usuário no Parse server
router.post('/login', async (req, res) => {
  try {
    const user = await Parse.User.logIn(req.body.username, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Deslogar usuário no Parse server
router.post('/logout', async (req, res) => {
  try {
    await Parse.User.logOut();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para verificar se o usuário está autenticado
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: 'Usuário não autenticado' });
  }
});

// Middleware para verificar se o usuário é um administrador
router.use((req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado' });
  }
});

// Middleware para verificar se a tarefa existe
router.use(async (req, res, next) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    if (task) {
      req.task = task;
      next();
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obter tarefa por ID
router.get('/:id', (req, res) => {
  res.json(req.task);
});

// Atualizar tarefa por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.updateTask(req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Excluir tarefa por ID
router.delete('/:id', async (req, res) => {
  try {
    await Task.deleteTask(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para verificar se o usuário é o criador da tarefa
router.use((req, res, next) => {
  if (req.task.userId === req.user.id) {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado' });
  }
});

// Middleware para verificar se a tarefa já foi concluída
router.use((req, res, next) => {
  if (req.task.status === 'done') {
    res.status(400).json({ message: 'Tarefa já concluída' });
  } else {
    next();
  }
});

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
