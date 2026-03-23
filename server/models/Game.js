import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  startupIdea: { type: String, required: true },
  initialMoney: { type: Number, required: true },
  currentMoney: { type: Number, required: true },
  moneySource: { type: String, required: true },
  growth: { type: Number, default: 0 },
  stress: { type: Number, default: 0 },
  stage: { type: Number, default: 1 },
  history: { type: Array, default: [] },
  gameStatus: { type: String, enum: ['active', 'won', 'lost'], default: 'active' },
  lastScenario: { type: Object, default: null },
  summary: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);
