import Parse from 'parse/node.js';

// Configurar a classe Task no Parse
class Task extends Parse.Object {
  constructor() {
    super('Task');
  }

  static async createTask({ title, description, priority, status, dueDate, category }) {
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
      throw new Error(`Erro ao criar tarefa: ${error.message}`);
    }
  }

  static async getTasks() {
    const query = new Parse.Query(Task);
    try {
      return await query.find();
    } catch (error) {
      throw new Error(`Erro ao buscar tarefas: ${error.message}`);
    }
  }
}

Parse.Object.registerSubclass('Task', Task);
export default Task;
