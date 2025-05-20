export interface VideoCartItem {
  auditStatus: 'SUCCESS' | 'FAIL';
  coverImage: string;
  price: number;
  softwareType: '视频素材' | 'AE模板' | 'C4D模版';
  title: string;
  licType: 'NP' | 'LP' | 'LPPLUS';
  vid: number;
}

export interface VideoCartResponse {
  data: VideoCartItem[];
} 