import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useBroadcastStore = create((set) => ({
  loading: false,
  chzzk: [],
  error: null,

  setChzzk: (data) => set({ chzzk: data }),

  fetchChzzk: async () => {
    try {
      set({ loading: true, chzzk: [], error: null });
      // const { data } = await axiosInstance.get('/broadcast/chzzk', {
      //   headers: {
      //     'Cache-Control': 'no-store',
      //   },
      // });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/broadcast/chzzk`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'max-age=600, s-maxage=600, must-revalidate',
          // 'CDN-Cache-Control': 'max-age=600, s-maxage=600, must-revalidate',
        },
        cache: 'reload',
        // next: { revalidate: 600 },
      });

      const data = await response.json();

      set({ chzzk: data });
    } catch (error) {
      console.error('Chzzk Fetch Error:', error);
      set({ error });
    } finally {
      set({ loading: false });
    }
  },
}));
