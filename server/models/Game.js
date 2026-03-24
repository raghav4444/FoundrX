import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  userId: { type: String, default: 'anonymous' },
  startupIdea: { type: String, required: true },
  startupType: { type: String, default: 'General' },
  initialMoney: { type: Number, required: true },
  currentMoney: { type: Number, required: true },
  monthlyBurn: { type: Number, default: 5000 },
  moneySource: { type: String, required: true },
  growth: { type: Number, default: 0 },
  stress: { type: Number, default: 0 },
  teamMorale: { type: Number, default: 50 },
  productMarketFit: { type: Number, default: 30 },
  marketTrust: { type: Number, default: 20 },
  stage: { type: Number, default: 1 },
  history: { type: Array, default: [] },
  gameStatus: { type: String, enum: ['active', 'running', 'struggling', 'pivot', 'won', 'lost'], default: 'active' },
  lastScenario: { type: Object, default: null },
  summary: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Game', gameSchema);
