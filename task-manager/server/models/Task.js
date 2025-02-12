import Parse from 'parse/node.js';

// Configurar a classe Task no Parse
class Task extends Parse.Object {
  constructor(attributes = {}, options = {}) {
    super('Task', attributes, options);

    if (!attributes) {
      throw new Error('Attributes is required');
    }

    if (!attributes.title) {
      throw new Error('Title is required');
    }
  }

  static async createTask({ title, description, priority, status, dueDate, category }) {
    if (!title) {
      throw new Error('Title is required');
    }

    const task = new Task();
    task.set('title', title);
    task.set('description', description || '');
    task.set('priority', priority || 'Média');
    task.set('status', status || 'todo');
    task.set('dueDate', dueDate ? new Date(dueDate) : null);
    task.set('category', category || '');

    try {
      const savedTask = await task.save();
      return savedTask;
    } catch (error) {
      if (error.code === 137) {
        throw new Error('Erro ao criar tarefa: Título deve ser único');
      }

      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  static async getTasks() {
    const query = new Parse.Query(Task);

    try {
      const tasks = await query.find();

      if (!tasks) {
        throw new Error('Erro ao buscar tarefas: Nenhuma tarefa encontrada');
      }

      return tasks;
    } catch (error) {
      if (error.code === 101) {
        throw new Error('Erro ao buscar tarefas: Nenhuma tarefa encontrada');
      }

      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }
}

Parse.Object.registerSubclass('Task', Task);
export default Task;
