import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import './Login.css'
import Parse from 'parse';

function Login() {
  // Armazena o email do usuário em estado local
  const [email, setEmail] = useState('');
  // Armazena a senha do usuário em estado local
  const [password, setPassword] = useState('');
  // Verifica se o usuário deseja lembrar seu email
  const [rememberMe, setRememberMe] = useState(false);
  // Armazena erros de login em estado local
  const [error, setError] = useState('');
  // Navega entre rotas
  const navigate = useNavigate();

  // Verifica se há um email salvo no LocalStorage quando o componente é montado
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      // Se houver, coloca ele no estado local
      setEmail(savedEmail);
      // E seta a opção de lembrar como true
      setRememberMe(true);
    }
  }, []);

  // Função que é executada quando o formulário é submetido
  const handleSubmit = async (e) => {
    // Evita que o formulário seja submetido naturalmente
    e.preventDefault();
    // Limpa erros de login
    setError('');

    // Verifica se os campos estão vazios
    if (!email || !password) {
      // Se estiverem, mostra um erro
      setError('Por favor, preencha todos os campos');
      // Sai da função
      return;
    }

    // Verifica se o email é válido
    if (!/\S+@\S+\.\S+/.test(email)) {
      // Se não for, mostra um erro
      setError('Por favor, insira um email válido');
      // Sai da função
      return;
    }

    try {
      // Tenta fazer o login no Parse
      const user = await Parse.User.logIn(email, password);

      // Verifica se o usuário deseja lembrar seu email
      if (rememberMe) {
        // Se sim, salva o email no LocalStorage
        localStorage.setItem('rememberedEmail', email);
      } else {
        // Se não, remove o email do LocalStorage
        localStorage.removeItem('rememberedEmail');
      }

      // Navega para a página de dashboard
      navigate('/dashboard');
    } catch (err) {
      // Se houver um erro, mostra um erro
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  // Renderiza o formulário de login
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Acesse sua conta</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Mostra erros de login */}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                {/* Ícone de email */}
                
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <div className="relative">
                {/* Ícone de senha */}
                
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Mostra opção de lembrar o email */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Lembrar de mim
              </label>
            </div>
            {/* Mostra link para esquecer senha */}
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          {/* Botão de entrar */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Entrar
            </button>
          </div>
          {/* Mostra link para cadastro */}
          <div className="text-center text-sm">
            <span className="text-gray-600">Não tem uma conta? </span>
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;