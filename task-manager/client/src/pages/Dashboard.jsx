import { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import axios from 'axios';
import SortableItem from '../components/SortableItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5173/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        {/* Sidebar */}
      </div>
      <div className="flex-1 p-8">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            <div className="flex gap-4">
              <div className="w-72 bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">A Fazer</h3>
                {tasks.map((task) => (
                  <SortableItem key={task._id} task={task} />
                ))}
              </div>
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Dashboard;
