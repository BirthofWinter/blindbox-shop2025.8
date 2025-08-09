import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BlindBoxCard from '../components/BlindBoxCard';
import CornerLogo from '../components/CornerLogo';

const Shop = () => {
  const [blindBoxes, setBlindBoxes] = useState([]);
  const [filteredBlindBoxes, setFilteredBlindBoxes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // 获取所有盲盒
        const blindBoxResponse = await axios.get('/blindbox/');
        // 检查是否有标准化响应格式
        if (blindBoxResponse.data && blindBoxResponse.data.success !== undefined) {
          // 新的标准化响应格式
          if (blindBoxResponse.data.success) {
            setBlindBoxes(blindBoxResponse.data.data);
            setFilteredBlindBoxes(blindBoxResponse.data.data);
          } else {
            throw new Error(blindBoxResponse.data.message || '获取盲盒数据失败');
          }
        } else {
          // 旧的响应格式
          setBlindBoxes(blindBoxResponse.data);
          setFilteredBlindBoxes(blindBoxResponse.data);
        }
        
        // 获取或创建购物车
        const userData = JSON.parse(userJson);
        const userId = userData.id;
        
        // 查找用户的待处理订单（购物车）
        const ordersResponse = await axios.get(`/order?userId=${userId}&status=pending`);
        
        if (ordersResponse.data.success) {
          const orders = ordersResponse.data.data;
          if (orders && orders.length > 0) {
            setCart(orders[0]);
          } else {
            // 如果没有待处理订单，创建一个新的购物车
            const newCartResponse = await axios.post('/order/cart', { userId });
            if (newCartResponse.data.success) {
              setCart(newCartResponse.data.data);
            } else {
              throw new Error(newCartResponse.data.message || '创建购物车失败');
            }
          }
        } else {
          throw new Error(ordersResponse.data.message || '获取订单数据失败');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('获取数据失败:', err);
        setError(err.message || '获取数据失败，请稍后再试');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // 处理搜索输入变化
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim() === '') {
      // 如果搜索框为空，显示所有盲盒
      setFilteredBlindBoxes(blindBoxes);
    } else {
      // 根据盲盒类型进行过滤
      const filtered = blindBoxes.filter(box => 
        box.type.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBlindBoxes(filtered);
    }
  };
  
  // 清除搜索
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBlindBoxes(blindBoxes);
  };

  const handlePurchase = async (blindBoxId, quantity) => {
    try {
      setError('');
      setSuccessMessage('');
      
      if (!cart) {
        setError('购物车不存在，请刷新页面');
        return;
      }
      
      // 添加到购物车
      const addToCartResponse = await axios.post(`/order/cart/${cart.id}/items`, {
        blindBoxId,
        quantity
      });
      
      if (!addToCartResponse.data.success) {
        setError(addToCartResponse.data.message || '添加到购物车失败');
        return;
      }
      
      // 结算购物车
      const checkoutResponse = await axios.post(`/order/cart/${cart.id}/checkout`);
      
      if (checkoutResponse.data.success) {
        setSuccessMessage('获取成功！您获得了新的E.G.O藏品！');
        
        // 创建新的购物车
        const userJson = localStorage.getItem('user');
        const userData = JSON.parse(userJson);
        const userId = userData.id;
        
        const newCartResponse = await axios.post('/order/cart', { userId });
        if (newCartResponse.data.success) {
          setCart(newCartResponse.data.data);
        }
        
        // 3秒后清除成功消息
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        // 处理结算失败的情况，包括脑啡肽不足
        setError(checkoutResponse.data.message || '获取失败');
      }
    } catch (err) {
      console.error('购买失败:', err);
      // 处理网络错误或其他异常
      setError(err.response?.data?.message || '获取失败，请稍后再试');
    }
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className="shop-page">
      <Navbar />
      <div className="shop-content">
        <h1>盲盒商城</h1>
        <p>使用脑啡肽获取E.G.O藏品</p>
        <CornerLogo />
        
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索盲盒类型..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search-button">
              清除
            </button>
          )}
        </div>
        
        {blindBoxes.length > 0 ? (
          <div className="blind-boxes-grid">
            {filteredBlindBoxes.length > 0 ? (
              filteredBlindBoxes.map(blindBox => (
              <BlindBoxCard 
                key={blindBox.id} 
                blindBox={blindBox} 
                onPurchase={handlePurchase} 
              />
              ))
            ) : (
              <p className="no-results">没有找到匹配的盲盒</p>
            )}
          </div>
        ) : (
          <p>暂无可获取的盲盒</p>
        )}
      </div>
    </div>
  );
};

export default Shop;