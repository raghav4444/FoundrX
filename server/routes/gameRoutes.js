import express from 'express';
import { startGame, getGameDashboard, processDecision, processCustomDecision } from '../controllers/gameController.js';

const router = express.Router();

router.post('/start', startGame);
router.get('/dashboard/:id', getGameDashboard);
router.post('/decision/custom/:id', processCustomDecision);
router.post('/decision/:id', processDecision);

export default router;
