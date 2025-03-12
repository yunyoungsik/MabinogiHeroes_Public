import { connectToDB } from '@/lib/database';
import Notice from '@/models/Notice';
import Counter from '@/models/Counter';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    await connectToDB();
    const { email, username, role, title, desc } = await req.json();

    const counter = await Counter.findOneAndUpdate(
      { name: 'counter' },
      { $inc: { noticeCounter: 1 } },
      { new: true }
    );

    const newNotice = new Notice({
      creator: { email, username, role },
      title,
      desc,
      noticeNum: counter.noticeCounter,
    });

    await newNotice.save();

    return NextResponse.json(newNotice, { status: 200 });
  } catch (error) {
    console.error('Notice Write Server Error:', error);
    return NextResponse.json({ message: 'Notice Write Server Error' }, { status: 500 });
  }
};
