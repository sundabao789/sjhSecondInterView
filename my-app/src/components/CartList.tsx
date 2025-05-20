import React from 'react';
import type { VideoCartItem } from '../types/cart';
import './CartList.css';

interface CartListProps {
  items: VideoCartItem[];
  selectedIds: number[];
  onSelect: (id: number) => void;
}

const getLicenseText = (licType: string) => {
  switch (licType) {
    case 'NP': return '个人授权';
    case 'LP':
    case 'LPPLUS': return '企业授权';
    default: return licType;
  }
};

const CartList: React.FC<CartListProps> = ({ items, selectedIds, onSelect }) => {
  return (
    <div className="cart-list">
      {items.map((item) => (
        <div key={item.vid} className={`cart-item${selectedIds.includes(item.vid) ? ' selected' : ''}`}>  
          <input
            type="checkbox"
            className="cart-item-checkbox"
            checked={selectedIds.includes(item.vid)}
            onChange={() => onSelect(item.vid)}
          />
          <div className="cart-item-image">
            <img src={item.coverImage} alt={item.title} />
          </div>
          <div className="cart-item-info">
            <div className="cart-item-title-row">
              <h3 className="cart-item-title">{item.title}</h3>
            </div>
            <div className="cart-item-sub">
              <span className='cart-id'>ID：098675</span>
              <span className="cart-item-dot" />
              <span className='cart-soft'>类型：{item.softwareType}</span>
              <span className="cart-item-dot" />
             
            </div>
            <div className="cart-item-license-row">
              <span className="cart-item-license-label">{getLicenseText(item.licType)}</span>
              <span className="cart-item-price">{item.price}
                <span className='price-text'></span>元</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList; 