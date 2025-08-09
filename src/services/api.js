import axios from 'axios';

// 设置基础URL
axios.defaults.baseURL = 'http://localhost:7001';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 可以在这里添加认证信息等
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('API错误:', error);
    return Promise.reject(error);
  }
);

// 用户相关API
export const userApi = {
  login: (nickname, password) => axios.post('/user/login', { nickname, password }),
  register: (nickname, password) => axios.post('/user/register', { nickname, password }),
  getUserById: (id) => axios.get(`/user/${id}`)
};

// 盲盒相关API
export const blindBoxApi = {
  getAll: () => axios.get('/blindbox/'),
  getById: (id) => axios.get(`/blindbox/${id}`)
};

// 收藏品相关API
export const collectibleApi = {
  getAll: () => axios.get('/collectible/'),
  getById: (id) => axios.get(`/collectible/${id}`)
};

// 展示相关API
export const displayApi = {
  setDisplay: (userId, collectibleId, position) => 
    axios.post(`/display/${userId}/set`, { collectibleId, position }),
  removeDisplay: (userId, position) => 
    axios.delete(`/display/${userId}/remove/${position}`),
  getUserDisplays: (userId) => 
    axios.get(`/display/${userId}`)
};

// 订单相关API
export const orderApi = {
  createCart: (userId) => 
    axios.post('/order/cart', { userId }),
  addToCart: (orderId, blindBoxId, quantity) => 
    axios.post(`/order/cart/${orderId}/items`, { blindBoxId, quantity }),
  removeFromCart: (orderId, blindBoxId) => 
    axios.delete(`/order/cart/${orderId}/items/${blindBoxId}`),
  updateCartItemQuantity: (orderId, blindBoxId, quantity) => 
    axios.put(`/order/cart/${orderId}/items/${blindBoxId}`, { quantity }),
  checkout: (orderId) => 
    axios.post(`/order/cart/${orderId}/checkout`),
  getAllOrders: (userId, status) => 
    axios.get(`/order?userId=${userId}${status ? `&status=${status}` : ''}`),
  getOrderById: (id) => 
    axios.get(`/order/${id}`)
};