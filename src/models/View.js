import { Schema, model, models } from 'mongoose';

// 한국 날짜(yyyy-mm-dd)를 반환하는 함수
const getKoreanDate = () => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // KST 변환 (UTC + 9)
  return now.toISOString().split('T')[0]; // yyyy-mm-dd 형식 반환
};

const ViewSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    todayViews: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: String,
      default: getKoreanDate(),
    },
  },
);

const View = models.View || model('View', ViewSchema);

export default View;
