import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useMarketplaceStore = create((set, get) => ({
  loading: false,
  error: '',
  item: [],
  marketEnchant: [],
  cache: {}, // 캐싱 객체 추가

  fetchMarketplace: async ({ itemName }) => {
    const { cache } = get();

    try {
      set({ loading: true, item: [], error: '' });

      // 캐시 확인 후 없으면 API 요청
      if (!cache[itemName]) {
        const res = await axiosInstance.get(`/marketplace?itemName=${itemName}`);
        const itemData = res.data.item.item;

        // 데이터 저장 및 캐시에 추가
        set((state) => ({
          item: itemData,
          cache: { ...state.cache, [itemName]: itemData },
        }));
      } else {
        // 캐시에서 데이터 사용
        set({ item: cache[itemName] });
      }
    } catch (error) {
      set({ error: `아이템을 찾는 중 에러가 발생했습니다.: ${error?.message || error}` });
      console.error('fetchMarketplace Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchEnchat: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/marketplace?itemName=인챈트 스크롤`);
      set({ marketEnchant: res.data.item.item });
    } catch (error) {
      console.error('fetchEnchat Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
