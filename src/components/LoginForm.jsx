import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('/user/login', { nickname, password });
      // 检查后端返回的JSON响应
      console.log('登录响应:', response.data);
      if (response.data.success) {
        // 存储用户信息到本地存储，包括用户ID
        localStorage.setItem('user', JSON.stringify({
          id: response.data.data.id,
          nickname: response.data.data.nickname,
          balance: response.data.data.balance
        }));
        navigate('/home');
      } else {
        setError(response.data.message || '登录失败，请稍后再试');
      }
    } catch (error) {
      setError('登录失败，请稍后再试');
      console.error('登录错误:', error);
    }
  };

  return (
    <div className="login-form" style={{ display: 'block', width: '100%', color: '#f0f0a0' }}>
      <h2 style={{ color: '#f0f0a0', marginBottom: '1rem' }}>主管登入</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="nickname" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#f0f0a0' }}>主管代号:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #f0f0a0', backgroundColor: '#222', color: '#f0f0a0', borderRadius: '4px' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#f0f0a0' }}>安全密钥:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #f0f0a0', backgroundColor: '#222', color: '#f0f0a0', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" className="login-button" style={{ backgroundColor: '#990000', color: '#f0f0a0', width: '100%', padding: '10px', marginTop: '1rem', border: '1px solid #f0f0a0', transition: 'all 0.3s ease' }}>进入设施</button>
      </form>
    </div>
  );
};

export default LoginForm;