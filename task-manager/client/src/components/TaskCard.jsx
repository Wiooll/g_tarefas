const TaskCard = ({ task }) => {
    return (
      <div className="bg-white p-4 mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <h4 className="font-medium">{task.title}</h4>
          <span className={`px-2 py-1 text-xs rounded-full 
            ${task.priority === 'Alta' ? 'bg-red-100 text-red-800' : 
            task.priority === 'Média' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-green-100 text-green-800'}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">{task.description}</p>
      </div>
    );
  };
  
  export default TaskCard;