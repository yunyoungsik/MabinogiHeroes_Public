import { connectToDB } from '@/lib/database';
import Notice from '@/models/Notice';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || 1;
  const postView = 10;
  const skip = (page - 1) * postView;

  try {
    await connectToDB();

    try {
      const notices = await Notice.find({})
        // .populate('creator')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(postView);
      const count = await Notice.countDocuments({});
      return new Response(JSON.stringify({ notices, count }), { status: 200 });
    } catch (error) {
      console.error('Error fetching notices:', error);
      return new Response('Notice Server Error', { status: 500 });
    }
  } catch (error) {
    return new Response('Notice Server Error', { status: 500 });
  }
};
