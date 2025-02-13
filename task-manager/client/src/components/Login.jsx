import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { EventEmitter } from 'events';
import Parse from 'parse';

// Inicializar Parse
Parse.initialize("Mvti7phsJfrngsOWwqzzohEPFoFO451RDNBX51rA", "17Tl1kMWMHhuXyc29JERiUl3lUvOVG7vPxd0NcLB");
Parse.serverURL = "https://parseapi.back4app.com/classes/Profile";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const user = await Parse.User.logIn(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      console.log('Login bem-sucedido:', user);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Acesse sua conta</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div>
            <EnvelopeIcon className="h-5 w-5 absolute top-3 left-3 text-gray-400" />
            <input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <LockClosedIcon className="h-5 w-5 absolute top-3 left-3 text-gray-400" />
            <input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Entrar</button>
          <Link to="/signup">Cadastre-se</Link>
        </form>
      </div>
    </div>
  );
};

  export default Login;