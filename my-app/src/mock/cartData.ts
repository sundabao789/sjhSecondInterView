import type { VideoCartItem } from '../types/cart';

export const mockCartData: VideoCartItem[] = [
  {
    vid: 1,
    title: "高级商业宣传片模板",
    coverImage: "https://picsum.photos/200/300",
    price: 299,
    softwareType: "AE模板",
    licType: "LP",
    auditStatus: "SUCCESS"
  },
  {
    vid: 2,
    title: "3D产品展示动画",
    coverImage: "https://picsum.photos/200/300",
    price: 499,
    softwareType: "C4D模版",
    licType: "LPPLUS",
    auditStatus: "SUCCESS"
  },
  {
    vid: 3,
    title: "企业宣传视频素材",
    coverImage: "https://picsum.photos/200/300",
    price: 199,
    softwareType: "视频素材",
    licType: "NP",
    auditStatus: "SUCCESS"
  },
  {
    vid: 4,
    title: "产品展示动画模板",
    coverImage: "https://picsum.photos/200/300",
    price: 399,
    softwareType: "AE模板",
    licType: "LP",
    auditStatus: "SUCCESS"
  }
]; 