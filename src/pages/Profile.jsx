import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CollectibleCard from '../components/CollectibleCard';
import CornerLogo from '../components/CornerLogo';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [collectibles, setCollectibles] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // 假设我们在登录时存储了用户ID
        const userData = JSON.parse(userJson);
        // 这里需要修改为实际的用户ID获取方式
        const userId = userData.id || 1; // 临时使用ID 1作为示例
        
        // 获取用户信息
        const userResponse = await axios.get(`/user/${userId}`);
        
        // 检查响应是否成功
        if (userResponse.data.success) {
          // 设置用户数据
          setUser(userResponse.data.data);
          
          // 获取用户的收藏品
          if (userResponse.data.data.collectibles) {
            setCollectibles(userResponse.data.data.collectibles);
          }
          
          // 获取用户的展示项
          if (userResponse.data.data.displayItems) {
            setDisplayItems(userResponse.data.data.displayItems);
          }
        } else {
          // 如果响应不成功，设置错误信息
          setError(userResponse.data.message || '获取用户数据失败，请稍后再试');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('获取用户数据失败:', err);
        setError('获取用户数据失败，请稍后再试');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSetDisplay = async (collectibleId, position) => {
    try {
      // 假设我们在登录时存储了用户ID
      const userJson = localStorage.getItem('user');
      const userData = JSON.parse(userJson);
      const userId = userData.id || 1; // 临时使用ID 1作为示例
      
      await axios.post(`/display/${userId}/set`, {
        collectibleId,
        position
      });
      
      // 更新本地状态
      const updatedDisplayItems = [...displayItems];
      const existingIndex = updatedDisplayItems.findIndex(item => item.position === position);
      
      if (existingIndex !== -1) {
        updatedDisplayItems[existingIndex].collectibleId = collectibleId;
      } else {
        updatedDisplayItems.push({ collectibleId, position });
      }
      
      setDisplayItems(updatedDisplayItems);
    } catch (err) {
      console.error('设置展示失败:', err);
      setError('设置展示失败，请稍后再试');
    }
  };

  const handleRemoveDisplay = async (collectibleId) => {
    try {
      // 找到对应的position
      const displayItem = displayItems.find(item => item.collectibleId === collectibleId);
      if (!displayItem) return;
      
      const userJson = localStorage.getItem('user');
      const userData = JSON.parse(userJson);
      const userId = userData.id || 1; // 临时使用ID 1作为示例
      
      await axios.delete(`/display/${userId}/remove/${displayItem.position}`);
      
      // 更新本地状态
      setDisplayItems(displayItems.filter(item => item.collectibleId !== collectibleId));
    } catch (err) {
      console.error('移除展示失败:', err);
      setError('移除展示失败，请稍后再试');
    }
  };

  const isCollectibleDisplayed = (collectibleId) => {
    return displayItems.some(item => item.collectibleId === collectibleId);
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        <h1>主管空间</h1>
        <CornerLogo />
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="user-info">
          <h2>{user?.nickname || '用户'}</h2>
          <p>脑啡肽: {user?.balance || 0}</p>
        </div>
        
        <div className="display-section">
          <h2>展示E.G.O藏品</h2>
          <div className="display-items">
            {displayItems.length > 0 ? (
              displayItems.map(item => {
                const collectible = collectibles.find(c => c.id === item.collectibleId);
                return collectible ? (
                  <div key={`display-${item.position}`} className="display-item">
                    <h3>展示位置 {item.position}</h3>
                    <CollectibleCard 
                      collectible={collectible} 
                      isDisplayed={true}
                      onSetDisplay={handleSetDisplay}
                      onRemoveDisplay={handleRemoveDisplay}
                    />
                  </div>
                ) : null;
              })
            ) : (
              <p>您还没有设置展示E.G.O藏品</p>
            )}
          </div>
        </div>
        
        <div className="collectibles-section">
          <h2>我的E.G.O藏品</h2>
          {collectibles.length > 0 ? (
            <div className="collectibles-grid">
              {collectibles.map(collectible => (
                <CollectibleCard 
                  key={collectible.id} 
                  collectible={collectible} 
                  isDisplayed={isCollectibleDisplayed(collectible.id)}
                  onSetDisplay={handleSetDisplay}
                  onRemoveDisplay={handleRemoveDisplay}
                />
              ))}
            </div>
          ) : (
            <p>您还没有E.G.O藏品，去商城获取盲盒吧！</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;