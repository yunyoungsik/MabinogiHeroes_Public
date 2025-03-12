import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useRankingStore = create((set, get) => ({
  liveLoading: false,
  hallLoading: false,
  rankings: { ad: [], ap: [] },
  hallOfHonors: { ad: [], ap: [] },

  fetchRanking: async ({ type, page }) => {
    try {
      set({ liveLoading: true });
      const res = await axiosInstance.get(`/ranking?type=${type}&page=${page}`);
      set((state) => ({
        rankings: {
          ...state.rankings,
          ...(type === 0 ? { ad: res.data.ranking.ranking } : { ap: res.data.ranking.ranking }),
        },
      }));
    } catch (error) {
      console.error('fetchUser Error:', error);
    } finally {
      set({ liveLoading: false });
    }
  },

  fetchHallOfHonors: async ({ type }) => {
    try {
      set({ hallLoading: true });
      const res = await axiosInstance.get(`/hall-of-honor?type=${type}`);
      set((state) => ({
        hallOfHonors: {
          ...state.hallOfHonors,
          // ...(type === 0 ? { ad: res.data.hallOfHonor.ranking } : { ap: res.data.hallOfHonor.ranking }),
          ...(type === 0
            ? { ad: res.data.hallOfHonor.character }
            : { ap: res.data.hallOfHonor.character }),
        },
      }));
    } catch (error) {
      console.error('fetchUser Error:', error);
    } finally {
      set({ hallLoading: false });
    }
  },
}));
