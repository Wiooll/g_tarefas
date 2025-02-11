import express from 'express';
import Parse from 'parse/node';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const Parse = require('parse/node');
const app = express();
const PORT = process.env.PORT || 5173;

// Configuração do Parse Server (Back4App)
Parse.initialize(process.env.BACK4APP_APP_ID, process.env.BACK4APP_JS_KEY);
Parse.serverURL = process.env.BACK4APP_SERVER_URL;

console.log('Conectado ao Back4App');

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/routes/tasks', taskRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
