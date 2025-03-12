import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  ranking: Number,
  score: Number,
  character_name: String,
  class: String,
  guild: String,
});

const statisticsSchema = new mongoose.Schema({
  type: String,
  lastUpdated: String,
  character: [characterSchema],  // character 배열 안에 객체 구조로 정의
});

const Statistics =
  mongoose.models.Statistics || mongoose.model('Statistics', statisticsSchema);

export default Statistics;
