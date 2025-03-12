import mongoose from 'mongoose';
import { connectToDB } from '@/lib/database';
import Notice from '@/models/Notice';
import PostView from '@/components/Post/View/PostView';

export async function generateMetadata({ params }) {
  if (!params?.id || !mongoose.isValidObjectId(params.id)) {
    return {
      title: '공지사항 - 최신 업데이트 및 소식 - MHON.KR',
      description:
        'MHON.KR의 최신 공지사항을 확인하고, 사이트에 대한 중요한 업데이트와 소식을 빠르게 알아보세요.',
    };
  }

  try {
    await connectToDB();
    const notice = await Notice.findById(params.id);
    if (!notice) {
      return {
        title: '공지사항 - 최신 업데이트 및 소식 - MHON.KR',
        description:
          'MHON.KR의 최신 공지사항을 확인하고, 사이트에 대한 중요한 업데이트와 소식을 빠르게 알아보세요.',
      };
    }

    return {
      title: `${notice.title} - 공지사항 - MHON.KR`,
      description:
        'MHON.KR의 최신 공지사항을 확인하고, 사이트에 대한 중요한 업데이트와 소식을 빠르게 알아보세요.',
    };
  } catch (error) {
    console.error('❌ generateMetadata 에러:', error);
    return {
      title: '공지사항 - 최신 업데이트 및 소식 - MHON.KR',
      description:
        'MHON.KR의 최신 공지사항을 확인하고, 사이트에 대한 중요한 업데이트와 소식을 빠르게 알아보세요.',
    };
  }
}

export default function page({ params }) {
  const postId = params.id;

  return <PostView postId={postId} />;
}
