import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const usePageViewStore = create((set) => ({
  loading: false,
  view: { today: 0, total: 0 },
  views: [],

  fetchView: async (name) => {
    try {
      set({ loading: true, view: { today: 0, total: 0 } });
      const res = await axiosInstance.get(`/view?name=${name}`, {
        headers: {
          'Cache-Control': 'no-store', // 캐시 비활성화
        },
      });
      set({
        view: {
          today: res.data.todayViews,
          total: res.data.totalViews,
        },
      });
    } catch (error) {
      console.log('fetchView Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchViews: async () => {
    try {
      set({ loading: true, views: [] });
      // const res = await axiosInstance.get(`/view/all`, {
      //   headers: {
      //     'Cache-Control': 'no-store', // 캐시 비활성화
      //   },
      // });
      // set({ views: res.data.views });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/view/all`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store',
          'CDN-Cache-Control': 'max-age=0, must-revalidate',
        },
        cache: 'no-store',
        next: { revalidate: 0 },
      });

      const data = await response.json();

      set({ views: data.views });
    } catch (error) {
      console.log('firstViews Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
