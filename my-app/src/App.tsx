import { useState, useEffect } from 'react'
import './App.css'
import FloatingBall from './components/FloatingBall'
import SideModal from './components/SideModal'
import CartList from './components/CartList'
import { fetchVideoCart, fetchImageCart, fetchMusicCart } from './api/cart'
import type { VideoCartItem } from './types/cart'

// 模拟视频数据
const mockVideoData: VideoCartItem[] = [
  {
    vid: 1,
    title: '模拟视频 1',
    coverImage: 'https://example.com/cover1.jpg',
    auditStatus: 'SUCCESS',
    softwareType: 'AE模板',
    licType: 'NP',
    price: 9.99
  },
  {
    vid: 2,
    title: '模拟视频 2',
    coverImage: 'https://example.com/cover2.jpg',
    auditStatus: 'FAIL',
    softwareType: 'C4D模版',
    licType: 'LP',
    price: 19.99
  }
];

// 模拟图片数据
const mockImageData: VideoCartItem[] = [
  {
    vid: 3,
    title: '模拟图片 1',
    coverImage: 'https://example.com/image1.jpg',
    auditStatus: 'SUCCESS',
    softwareType: '视频素材',
    licType: 'NP',
    price: 4.99
  }
];

// 模拟音乐数据
const mockMusicData: VideoCartItem[] = [
  {
    vid: 4,
    title: '模拟音乐 1',
    coverImage: 'https://example.com/music1.jpg',
    auditStatus: 'SUCCESS',
    softwareType: 'AE模板',
    licType: 'LPPLUS',
    price: 29.99
  }
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tab, setTab] = useState<'video'|'image'|'music'>('image');
  const [videoList, setVideoList] = useState<VideoCartItem[]>([]);
  const [imageList, setImageList] = useState<VideoCartItem[]>([]);
  const [musicList, setMusicList] = useState<VideoCartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isModalOpen) return;
    if (tab === 'image') {
      fetchImageCart().then(res => {
        const arr = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setImageList(arr);
        setSelectedIds([]);
      });
    } else if (tab === 'music') {
      fetchMusicCart().then(res => {
        const arr = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setMusicList(arr);
        setSelectedIds([]);
      });
    } else if (tab === 'video') {
      fetchVideoCart().then(res => {
        const arr = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setVideoList(arr);
        setSelectedIds([]);
      });
    }
  }, [isModalOpen, tab]);

  const handleBallClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  let list: VideoCartItem[] = [];
  if (tab === 'video') list = videoList;
  else if (tab === 'image') list = imageList;
  else if (tab === 'music') list = musicList;

  return (
    <>
      <FloatingBall
        color="#ffffff"
        size={54}
        onClick={handleBallClick}
      />
      <SideModal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="cart-tabs">
          <div className={`cart-tab${tab === 'video' ? ' active' : ''}`} onClick={() => setTab('video')}>
            视频 {Array.isArray(videoList) ? videoList.length : 0}
          </div>
          <div className={`cart-tab${tab === 'image' ? ' active' : ''}`} onClick={() => setTab('image')}>
            图片 {Array.isArray(imageList) ? imageList.length : 0}
          </div>
          <div className={`cart-tab${tab === 'music' ? ' active' : ''}`} onClick={() => setTab('music')}>
            音乐 {Array.isArray(musicList) ? musicList.length : 0}
          </div>
        </div>
        <CartList items={Array.isArray(list) ? list : []} selectedIds={selectedIds} onSelect={handleSelect} />
        <div className="cart-footer">
          <div className="cart-footer-content">
            <div className="cart-footer-row">
          <div className="cart-footer-left">
            <input
              type="checkbox"
              checked={list.length > 0 && selectedIds.length === list.length}
              onChange={e => setSelectedIds(e.target.checked ? list.map(item => item.vid) : [])}
              className='all-select-checkbox'
            />
            <span className='all-select-text'>全选</span>
          </div>
          <span className='selected-count'>已选 {selectedIds.length} 件</span>
          <span className='zongji'>总计：<span className='all-price'>{list.filter(item => selectedIds.includes(item.vid)).reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span><span className='yuan-text'>元</span></span>
            </div>
          <button
            className='sale-button'
            onClick={() => {
              if (selectedIds.length === 0) {
                alert('请先选择商品');
              } else {
                const selectedItems = list.filter(item => selectedIds.includes(item.vid));
                const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
                selectedItems.forEach(item => {
                  console.log(`业务线: ${item.softwareType}, id: ${item.vid}`);
                });
                console.log(`总价格: ${totalPrice}`);
                alert(`已购买商品：\n${selectedItems.map(i => `标题为：${i.title}，类型为：${i.softwareType}，价钱为：￥${i.price}`).join(', ')}`);
              }
            }}
          >立即购买</button>
          </div>
        </div>
      </SideModal>
    </>
  )
}

export default App
