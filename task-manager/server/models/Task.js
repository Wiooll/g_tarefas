import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { 
    type: String, 
    enum: ['Baixa', 'Média', 'Alta'],
    default: 'Média'
  },
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'done'],
    default: 'todo'
  },
  dueDate: Date,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', taskSchema);