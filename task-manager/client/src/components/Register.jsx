import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import Parse from 'parse';

// Função para criar o usuário no back4app
async function signUp(email, password) {
  try {
    // Cria o usuário no back4app
    const user = await Parse.User.signUp(email, password);
    // Salva o email no LocalStorage se a opção de lembrar estiver selecionada
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    }
    // Redireciona para a rota de dashboard
    navigate('/dashboard');
  } catch (error) {
    // Trata erros de login
    setError(error.message);
  }
}

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://parseapi.back4app.com/users', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;