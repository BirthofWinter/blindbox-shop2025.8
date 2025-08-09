import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  // 检查用户是否已登录
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/home');
    }
  }, [navigate]);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="login-page">
      <div className="form-container">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button className="toggle-form" onClick={toggleForm}>
          {showLogin ? '没有账号？去注册' : '已有账号？去登录'}
        </button>
      </div>
    </div>
  );
};

export default Login;