import { axiosInstance } from './axios';

export const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);
