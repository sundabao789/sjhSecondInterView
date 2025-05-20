import type { VideoCartResponse, VideoCartItem } from '../types/cart';

const titles = [
  "2023年EDUIS系列-模板可编辑销售",
  "高级商业宣传片模板",
  "3D产品展示动画",
  "企业宣传视频素材",
  "产品展示动画模板"
];
const covers = [
  "https://picsum.photos/seed/1/120/80",
  "https://picsum.photos/seed/2/120/80",
  "https://picsum.photos/seed/3/120/80",
  "https://picsum.photos/seed/4/120/80",
  "https://picsum.photos/seed/5/120/80"
];
const softwareTypes: VideoCartItem['softwareType'][] = ["视频素材", "AE模板", "C4D模版"];
const licTypes: VideoCartItem['licType'][] = ["NP", "LP", "LPPLUS"];
const prices = [30, 130, 380, 299, 199, 399, 499];

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomVideoCartItem(id: number): VideoCartItem {
  return {
    vid: id,
    title: randomPick(titles),
    coverImage: randomPick(covers),
    price: randomPick(prices),
    softwareType: randomPick(softwareTypes),
    licType: randomPick(licTypes),
    auditStatus: 'SUCCESS'
  };
}

export function fetchVideoCart(): Promise<VideoCartResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 5) + 4;
      const data = Array.from({ length: count }, (_, i) => randomVideoCartItem(i + 1));
      resolve({ data });
    }, 300);
  });
}

export function fetchImageCart(): Promise<VideoCartResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 3) + 2;
      const data: VideoCartItem[] = Array.from({ length: count }, (_, i) => ({
        vid: i + 100,
        title: `图片素材${i + 1}`,
        coverImage: `https://picsum.photos/seed/img${i}/120/80`,
        price: Math.floor(Math.random() * 100) + 10,
        softwareType: "图片素材" as VideoCartItem['softwareType'],
        licType: "NP",
        auditStatus: 'SUCCESS'
      }));
      resolve({ data });
    }, 300);
  });
}

export function fetchMusicCart(): Promise<VideoCartResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      const count = Math.floor(Math.random() * 3) + 2;
      const data: VideoCartItem[] = Array.from({ length: count }, (_, i) => ({
        vid: i + 200,
        title: `音乐素材${i + 1}`,
        coverImage: `https://picsum.photos/seed/music${i}/120/80`,
        price: Math.floor(Math.random() * 100) + 10,
        softwareType: "音乐素材" as VideoCartItem['softwareType'],
        licType: "NP",
        auditStatus: 'SUCCESS'
      }));
      resolve({ data });
    }, 300);
  });
} 