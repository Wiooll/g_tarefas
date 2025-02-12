import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

// Check for bugs such as null pointer references, unhandled exceptions, and more.
// eslint-disable-next-line no-console
console.assert(
  typeof App === 'function' && App.prototype && App.prototype.render,
  'The App component must be a function and have a render method.'
);

export default App;