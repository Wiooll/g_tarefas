import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() { // Componente principal
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Dashboard/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Exporta o componente principal