import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">盲盒商城</div>
      <div className="nav-links">
        <button onClick={() => navigate('/home')} className="nav-link">主页</button>
        <button onClick={() => navigate('/profile')} className="nav-link">个人主页</button>
        <button onClick={() => navigate('/shop')} className="nav-link">商城</button>
        <button onClick={handleLogout} className="nav-link logout">退出登录</button>
      </div>
    </nav>
  );
};

export default Navbar;