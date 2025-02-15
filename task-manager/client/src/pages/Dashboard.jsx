import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import axios from 'axios';
import SortableItem from '../components/SortableItem';

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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('https://parseapi.back4app.com/classes/Task');
        data ? setTasks(data) : console.error('Erro ao buscar tarefas:', data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error.response?.data || error.request || error.message);
      }
    };
    fetchTasks();
  }, []);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setTasks((items) => arrayMove(items, items.findIndex(item => item.id === active.id), items.findIndex(item => item.id === over.id)));
    }
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    const { title, priority, dueDate } = newTask;
    if (!title || !priority || !dueDate) {
      console.error('Erro ao criar tarefa: Todos os campos são obrigatórios');
      return;
    }

    try {
      const task = new Parse.Object('Task');
      Object.entries(newTask).forEach(([key, value]) => task.set(key, key === 'dueDate' ? new Date(value) : value || ''));
      task.set('userId', Parse.User.current().id);
      const savedTask = await task.save();
      setTasks((prevTasks) => [...prevTasks, savedTask]);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>
        <form onSubmit={handleCreateTask} className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Título" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="p-2 border rounded" required />
          <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })} className="p-2 border rounded">
            {['Baixa', 'Média', 'Alta'].map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
          <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} className="p-2 border rounded" />
          <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Adicionar Tarefa</button>
        </form>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tarefas</h2>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {tasks.map((task) => (
                <SortableItem key={task.id} id={task.id}>
                  <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'Alta' ? 'bg-red-100 text-red-800' : task.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span>
                    </div>
                    {task.description && <p className="text-gray-600 text-sm mt-2">{task.description}</p>}
                    {task.dueDate && <p className="text-gray-500 text-xs mt-2">Vencimento: {new Date(task.dueDate).toLocaleDateString()}</p>}
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