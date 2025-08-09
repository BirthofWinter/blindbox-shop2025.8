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
    <div className="login-form">
      <h2>登录</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="nickname">用户名:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">登录</button>
      </form>
    </div>
  );
};

export default LoginForm;