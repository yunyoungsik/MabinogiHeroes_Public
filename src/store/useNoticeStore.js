import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useNoticeStore = create((set, get) => ({
  loading: false,
  notice: [],
  patch: [],
  event: [],

  fetchNotice: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/notice`);
      set({ notice: res.data.notice.notice, patch: res.data.patch.patch_notice, event: res.data.event.event_notice });
    } catch (error) {
      console.error('fetchNotice Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
