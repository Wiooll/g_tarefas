import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import axios from 'axios';
import SortableItem from '../components/SortableItem';

// Componente principal
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Média',
    status: 'todo',
    dueDate: '',
    category: ''
  });

  // Buscar tarefas do backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://parseapi.back4app.com/parse/classes/Task');
        if (response.data !== null && response.data !== undefined) {
          setTasks(response.data);
        } else {
          console.error('Erro ao buscar tarefas:', response);
        }
      } catch (error) {
        if (error.response) {
          console.error('Erro ao buscar tarefas:', error.response.data);
        } else if (error.request) {
          console.error('Erro ao buscar tarefas:', error.request);
        } else {
          console.error('Erro ao buscar tarefas:', error.message);
        }
      }
    };
    fetchTasks();
  }, []);

  // Lógica de drag & drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Criar nova tarefa
  const handleCreateTask = async (event) => { // Adicione o parâmetro event
    event.preventDefault(); // Impede o comportamento padrão do formulário

    if (!newTask.title) { // Verifique se o título da nova tarefa está vazio
      console.error('Erro ao criar tarefa: Título é obrigatório');
      return;
    }

    if (!newTask.priority) { // Verifique se a prioridade da nova tarefa está vazia
      console.error('Erro ao criar tarefa: Prioridade é obrigatória');
      return;
    }

    if (!newTask.dueDate) { //Verifique se a data de entrega da nova tarefa está vazia
      console.error('Erro ao criar tarefa: Data de entrega é obrigatória');
      return;
    }

    try {
      const Task = Parse.Object.extend("Task");
      const task = new Task();
      task.set('title', newTask.title);
      task.set('description', newTask.description || '');
      task.set('priority', newTask.priority);
      task.set('status', newTask.status || 'todo');
      task.set('dueDate', new Date(newTask.dueDate));
      task.set('category', newTask.category || '');
      const savedTask = await task.save();
      setTasks([...tasks, savedTask]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Cabeçalho e Formulário */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>
        <form onSubmit={handleCreateTask} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Título"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <select
            value={newTask.priority}
            onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Adicionar Tarefa
          </button>
        </form>
      </div>

      {/* Lista de Tarefas com Drag & Drop */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tarefas</h2>
          <SortableContext
            items={tasks}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {tasks.map((task) => (
                <SortableItem key={task.id} id={task.id}>
                  <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                    )}
                    {task.dueDate && (
                      <p className="text-gray-500 text-xs mt-2">
                        Vencimento: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
};

export default Dashboard;