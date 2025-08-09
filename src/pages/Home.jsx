import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
        <h1>欢迎来到盲盒商城</h1>
        <p>在这里，您可以购买各种盲盒，收集独特的收藏品！</p>
        
        <div className="main-buttons">
          <button className="main-button" onClick={goToProfile}>
            个人主页
            <p>查看您的收藏品和展示</p>
          </button>
          
          <button className="main-button" onClick={goToShop}>
            商城
            <p>购买新的盲盒</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;