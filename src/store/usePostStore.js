import { create } from 'zustand';
import { axiosInstance } from '@/lib/axios';

export const usePostStore = create((set) => ({
  loading: false,
  allPosts: [],
  count: null,
  post: '',

  fetchPosts: async (page = 1) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get(`/post?page=${page}`);
      set({ allPosts: res.data.notices, count: res.data.count });
    } catch (error) {
      console.error('fetchPosts Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchPost: async (postId) => {
    try {
      set({ loading: true});
      const res = await axiosInstance.get(`/post/${postId}`);
      set({ post: res.data });
    } catch (error) {
      console.error('fetchPost Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  writePost: async ({ email, username, role, title, desc }) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post('/post/write', { email, username, role, title, desc });
      return res;
    } catch (error) {
      console.error('writePost Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  patchPost: async ({ postId, title, desc }) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.patch(`/post/${postId}`, { title, desc });
      return res;
    } catch (error) {
      console.error('patchPost Error:', error);
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (postId) => {
    try {
      set({ loading: true });
      await axiosInstance.delete(`/post/${postId}`);
    } catch (error) {
      console.error('deletePost Error:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
