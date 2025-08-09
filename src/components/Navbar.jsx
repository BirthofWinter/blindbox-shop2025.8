import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <img src="/companyLogo" alt="公司Logo" width="30" height="30" />
        Lobotomy Corporation
      </div>
      <div className="nav-links">
        <button onClick={() => navigate('/home')} className="nav-link">主页</button>
        <button onClick={() => navigate('/profile')} className="nav-link">主管空间</button>
        <button onClick={() => navigate('/shop')} className="nav-link">商城</button>
        <button onClick={handleLogout} className="nav-link logout">退出登录</button>
      </div>
    </nav>
  );
};

export default Navbar;