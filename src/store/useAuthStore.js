import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const useAuthStore = create((set) => ({
  loading: false,
  authUser: null,
  error: null,
  checkingAuth: true,

  signup: async (singupData) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post('/auth/signup', singupData);
      if (res.status === 200) {
        set({ authUser: res.data.user });
        return res.data.user;
      }
    } catch (error) {
      console.error('signup Error:', error);
      set({ error: error.response.data.message || '회원가입에 실패했습니다.' });
      setTimeout(() => set({ error: null }), 10000);
    } finally {
      set({ loading: false });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post('/auth/login', loginData);
      if (res.status === 200) {
        set({ authUser: res.data.user });
        return res.data.user;
      }
    } catch (error) {
      console.error('login Error:', error);
      set({ error: error.response.data.message || '로그인에 실패했습니다.' });
      setTimeout(() => set({ error: null }), 10000);
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post('/auth/logout');
      if (res.status === 200) set({ authUser: null });
    } catch (error) {
      console.error('logout Error:', error);
    }
  },

  modifyAccount : async (modifyData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.patch('/auth', modifyData);
      set({ authUser: res.data.user });
      return res.data;
    } catch (error) {
      console.error('update Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  deleteAccount: async (userId) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.delete('/auth', {
        data: { userId },
      });
      if (res.status === 200) set({ authUser: null });
    } catch (error) {
      console.error('deleteAccount Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
      console.log(error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),
}));
