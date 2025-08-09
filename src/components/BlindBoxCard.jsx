import { useState } from 'react';
import axios from 'axios';

const BlindBoxCard = ({ blindBox, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleBuyClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmPurchase = () => {
    onPurchase(blindBox.id, quantity);
    setShowConfirm(false);
    setQuantity(1);
  };

  const handleCancelPurchase = () => {
    setShowConfirm(false);
  };

  return (
    <div className="blind-box-card">
      <h3>{blindBox.type}</h3>
      <p className="price">脑啡肽: {blindBox.price}</p>
      
      {!showConfirm ? (
        <div className="purchase-controls">
          <div className="quantity-control">
            <label htmlFor={`quantity-${blindBox.id}`}>数量:</label>
            <input
              type="number"
              id={`quantity-${blindBox.id}`}
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button className="buy-button" onClick={handleBuyClick}>获取</button>
        </div>
      ) : (
        <div className="confirm-purchase">
          <p>确认获取 {quantity} 个 {blindBox.type} 盲盒?</p>
          <p>总计脑啡肽: {(blindBox.price * quantity).toFixed(2)}</p>
          <div className="confirm-buttons">
            <button className="confirm-button" onClick={handleConfirmPurchase}>确认</button>
            <button className="cancel-button" onClick={handleCancelPurchase}>取消</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlindBoxCard;