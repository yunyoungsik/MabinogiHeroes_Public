import { Schema, model, models } from 'mongoose';

const NoticeSchema = new Schema({
  creator: {
    email: {
      type: String,
      required: [true, 'creator email required.'],
    },
    username: {
      type: String,
      required: [true, 'creator username required.'],
    },
    role : {
      type: String,
      default: 'member'
    }
  },
  noticeNum: {
    type: Number,
    required: [true, 'noticeNum required.']
  },
  view: {
    type: Number,
    default: 0,
    required: [true, 'view required.']
  },
  title: {
    type: String,
    required: [true, 'title is required.'],
  },
  desc: {
    type: String,
    required: [true, 'desc is required.'],
  },
}, { timestamps: true });

const Notice = models.Notice || model('Notice', NoticeSchema);

export default Notice;
