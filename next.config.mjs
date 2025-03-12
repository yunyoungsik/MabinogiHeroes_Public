// next.config.mjs
const nextConfig = {
  staticPageGenerationTimeout: 300, // 5분
  images: {
    domains: ['mhon.kr', 'localhost'],
    loader: 'default',
  },
  compiler: {
    // 배포 환경에서 console 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
