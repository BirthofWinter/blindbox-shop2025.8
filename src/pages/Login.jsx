import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import CornerLogo from '../components/CornerLogo';

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
    <div className="login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      <div style={{ width: '30%', height: '100%', position: 'absolute', left: 0, top: 0, backgroundColor: 'transparent' }}></div>
      <div className="form-container" style={{ backgroundColor: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #f0f0a0', boxShadow: '0 2px 20px rgba(240, 240, 160, 0.2)', width: '100%', maxWidth: '400px', zIndex: 10, marginLeft: '20%' }}>
        <div className="login-header">
          <img src="/companyLogo" alt="Lobotomy Corporation Logo" width="60" height="60" />
          <h1>Lobotomy Corporation</h1>
          <p className="slogan">面对恐惧，创造未来</p>
        </div>
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button className="toggle-form" onClick={toggleForm} style={{ backgroundColor: 'transparent', color: '#f0f0a0', border: '1px solid #f0f0a0', padding: '8px 16px', marginTop: '1rem', width: '100%', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.3s ease' }}>
          {showLogin ? '新主管？申请注册' : '已有主管代号？返回登入'}
        </button>
      </div>
      <CornerLogo />
    </div>
  );
};

export default Login;