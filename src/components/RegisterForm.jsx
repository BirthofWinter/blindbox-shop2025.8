import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    try {
      const response = await axios.post('/user/register', { nickname, password });
      // 检查后端返回的JSON响应
      console.log('注册响应:', response.data);
      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message || '注册失败，请稍后再试');
      }
    } catch (error) {
      setError('注册失败，请稍后再试');
      console.error('注册错误:', error);
    }
  };

  return (
    <div className="register-form" style={{ display: 'block', width: '100%', color: '#f0f0a0' }}>
      <h2 style={{ color: '#f0f0a0', marginBottom: '1rem' }}>主管注册</h2>
      {error && <div className="error-message" style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#f0f0a0' }}>确认安全密钥:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #f0f0a0', backgroundColor: '#222', color: '#f0f0a0', borderRadius: '4px' }}
          />
        </div>
        <button type="submit" className="register-button" style={{ backgroundColor: '#990000', color: '#f0f0a0', width: '100%', padding: '10px', marginTop: '1rem', border: '1px solid #f0f0a0', transition: 'all 0.3s ease' }}>提交申请</button>
      </form>
    </div>
  );
};

export default RegisterForm;