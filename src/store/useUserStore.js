import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

const CACHE_DURATION = 120 * 1000; // API 요청 제한 시간

export const useUserStore = create((set, get) => ({
  loading: false,
  error: null,
  basic: [],
  guild: [],
  itemEquipment: [],
  stat: [],
  title: [],
  titleEquipment: [],

  setStat: (data) => set({ stat: data }),

  fetchUser: async (name) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.get(`/user?name=${name}`);
      set({
        basic: res.data.basic,
        guild: res.data.guild,
        itemEquipment: res.data.itemEquipment.item_equipment,
        stat: res.data.stat.stat,
        title: res.data.title,
        titleEquipment: res.data.titleEquipment.title_equipment,
      });
    } catch (error) {
      set({ error: `캐릭터를 찾는 중 에러가 발생했습니다.: ${error?.message || error}` });
      console.error('fetchUser Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
