import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Parse from 'parse';
import Login from './Login';

// Inicializar Parse
Parse.initialize("Mvti7phsJfrngsOWwqzzohEPFoFO451RDNBX51rA", "7LObWzjaEilkgzpyZlhlAvZScLHEaDz8A55JKUSx");
Parse.serverURL = "https://parseapi.back4app.com/users";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const user = new Parse.User();
      user.set("username", formData.username);
      user.set("email", formData.email);
      user.set("password", formData.password);
      await user.signUp();
      console.log('Usuário registrado:', user);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao registrar: ' + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nome de Usuário" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirme a Senha" value={formData.confirmPassword} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;