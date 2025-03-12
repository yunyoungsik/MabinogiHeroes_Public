import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import localFont from 'next/font/local';
// compoenents
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import AuthCheck from '@/components/Auth/AuthCheck';
import '@/assets/styles/main.scss'

// const pretendard = localFont({
//   src: 'assets/fonts/PretendardVariable.woff2',
//   display: 'swap',
//   weight: '100 900',
//   variable: '--font-pretendard',
// });

export const metadata = {
  generator: 'Next.js',
  title: 'MHON.KR - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보',
  description:
    '마비노기 영웅전 캐릭터 검색, 실시간 랭킹, 거래소 시세를 한눈에 확인하세요. 최신 정보로 빠르게 원하는 데이터를 찾아보세요.',
  keywords: [
    'MHON, MHON.KR, 엠에이치온, 마비노기영웅전, 마영전, 마비노기영웅전 검색, 마비노기영웅전 검색 사이트, 마영전 검색, 마영전 검색 사이트, 마비노기영웅전 랭킹, 마영전 랭킹, 마비노기영웅전 거래소, 마영전 거래소',
  ],
  authors: [{ name: 'ON.KR' }],
  creator: [{ name: 'ON.KR' }],
  publisher: [{ name: 'ON.KR' }],
  formatDetection: {
    email: 'on_kr@outlook.kr',
  },
  icons: {
    icon: 'favicon.svg',
  },
  metadataBase: new URL('https://mhon.kr'),
  images: 'https://mhon.kr/image/meta/meta.jpg',
  openGraph: {
    title: 'MHON.KR - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보',
    description:
      '마비노기 영웅전 캐릭터 검색, 실시간 랭킹, 거래소 시세를 한눈에 확인하세요. 최신 정보로 빠르게 원하는 데이터를 찾아보세요.',
    url: 'https://mhon.kr',
    siteName: 'MHON.KR',
    images: 'https://mhon.kr/image/meta/meta.jpg',
    locale: 'ko_KR',
    type: 'website',
    type: 'article',
    publishedTime: '2024-03-31T00:00:00.000Z',
    authors: ['Yun'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    Yeti: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MHON.KR - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보',
  description:
    '마비노기 영웅전 캐릭터 검색, 실시간 랭킹, 거래소 시세를 한눈에 확인하세요. 최신 정보로 빠르게 원하는 데이터를 찾아보세요.',
    images: ['https://mhon.kr/image/meta/meta.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      {/* <body className={` ${pretendard.variable}`}> */}
      <body>
        <GoogleAnalytics gaId="G-D98PS2PM8B" />
        <GoogleTagManager gtmId="GTM-N86SVFLC" />
        <div className="wrap">
          <AuthCheck />
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
