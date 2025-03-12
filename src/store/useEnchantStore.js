import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useEnchantStore = create((set, get) => ({
  loading: false,
  error: '',
  enchant: {}, // 각 enchantName별로 저장
  cache: {},   // 캐시로 중복 요청 방지

  fetchEnchant: async ({ type, enchantName }) => {
    if (!enchantName) return; // 유효성 검사 추가
  
    const { cache, enchant } = get();
    try {
      set({ loading: true, error: '' });
  
      // 캐시 확인
      if (cache[enchantName]) {
        set({
          enchant: { ...enchant, [enchantName]: cache[enchantName] },
        });
        return;
      }
  
      // API 요청
      const encodedName = encodeURIComponent(enchantName);
      const res = await axiosInstance.get(`/enchant?type=${type}&enchantName=${encodedName}`);
      const enchantData = res.data?.enchant;
  
      if (enchantData) {
        set((state) => ({
          enchant: { ...state.enchant, [enchantName]: enchantData },
          cache: { ...state.cache, [enchantName]: enchantData },
        }));
      }
    } catch (error) {
      set({ error: `인챈트를 불러오는 중 오류 발생: ${error?.message || error}` });
      console.error('fetchEnchant Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));