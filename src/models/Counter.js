import { Schema, model, models } from 'mongoose';

const CounterSchema = new Schema({
  name: {
    type: String,
    default: 'counter',
    required: [true, 'Counter name is required.'],
  },
  noticeCounter: {
    type: Number,
    required: [true, 'Counter noticeCounter is required.'],
  },
});

const Counter = models.Counter || model('Counter', CounterSchema);

export default Counter;
