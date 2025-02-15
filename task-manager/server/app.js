import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Parse from 'parse/node.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5173;

// Inicializa Parse (Back4App)
Parse.initialize(process.env.BACK4APP_APP_ID, process.env.BACK4APP_JS_KEY); 
Parse.serverURL = process.env.BACK4APP_SERVER_URL;

// Middlewares
app.use(express.json()); // Middleware para analisar requisicoes JSON
app.use(cors()); // Middleware para habilitar CORS

// Rotas
app.use('/classes/Tasks', taskRoutes); // Rotas de tarefas

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

