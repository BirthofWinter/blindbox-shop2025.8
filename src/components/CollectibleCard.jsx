import { useState } from 'react';

const CollectibleCard = ({ collectible, isDisplayed, onSetDisplay, onRemoveDisplay }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  // 检查E.G.O藏品名称是否以8结尾
  const hasStarBadge = collectible.name.endsWith('8');

  const handleCardClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSetDisplay = (position) => {
    onSetDisplay(collectible.id, position);
    setShowOptions(false);
  };

  const handleRemoveDisplay = () => {
    onRemoveDisplay(collectible.id);
    setShowOptions(false);
  };

  return (
    <div 
      className={`collectible-card ${isDisplayed ? 'displayed' : ''}`}
      onClick={handleCardClick}
    >
      <h3>{collectible.name}</h3>
      <p>来自: {collectible.blindBox?.type || '未知盲盒'}</p>
      
      {isDisplayed && <div className="display-badge">已装备</div>}
      {hasStarBadge && <div className="star-badge">★</div>}
      
      {showOptions && (
        <div className="display-options">
          {!isDisplayed ? (
            <>
              <button onClick={() => handleSetDisplay(1)}>设为展示位置1</button>
              <button onClick={() => handleSetDisplay(2)}>设为展示位置2</button>
            </>
          ) : (
            <button onClick={handleRemoveDisplay}>取消展示</button>
          )}
          <button onClick={() => setShowOptions(false)}>关闭</button>
        </div>
      )}
    </div>
  );
};

export default CollectibleCard;