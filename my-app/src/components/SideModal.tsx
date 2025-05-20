import React, { useState, useEffect } from 'react';
import './SideModal.css';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, children }) => {
  const [show, setShow] = useState(isOpen);
  const [hideAnim, setHideAnim] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setHideAnim(false);
    } else if (show) {
      setHideAnim(true);
      const timer = setTimeout(() => {
        setShow(false);
        setHideAnim(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div className="side-modal-overlay" onClick={onClose} />
      <div className={`side-modal${hideAnim ? ' hide' : ''}`}>
        <button className="side-modal-close" onClick={onClose}>×</button>
        <div className="side-modal-header">
          <h2 className="side-modal-title">购物车</h2>
        </div>
        <div className="side-modal-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default SideModal; 