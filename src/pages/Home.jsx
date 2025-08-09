import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CornerLogo from '../components/CornerLogo';

const Home = () => {
  const navigate = useNavigate();

  // 检查用户是否已登录
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <h1>欢迎回到公司，主管</h1>
        <p>在这里，您可以获取各种盲盒，收集独特的E.G.O藏品！</p>
        
        <div className="main-buttons">
          <button className="main-button" onClick={goToProfile}>
            主管空间
            <p>查看您的E.G.O藏品和展示</p>
          </button>
          
          <button className="main-button" onClick={goToShop}>
            商城
            <p>获取新的盲盒</p>
          </button>
        </div>
      </div>
      <CornerLogo />
    </div>
  );
};

export default Home;