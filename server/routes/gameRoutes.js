import express from 'express';
import mongoose from 'mongoose';
import { startGame, getGameDashboard, processDecision, processCustomDecision } from '../controllers/gameController.js';

const router = express.Router();

router.post('/start', startGame);
router.get('/dashboard/:id', getGameDashboard);
router.post('/decision/custom/:id', processCustomDecision);
router.post('/decision/:id', processDecision);

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    time: new Date().toISOString()
  });
});

export default router;
