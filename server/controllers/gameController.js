import Game from '../models/Game.js';
import { getInitialGameState, applyDecision, checkRandomEvent } from '../services/gameEngine.js';
import { generateScenario, generateCustomScenario, generateGameSummary } from '../services/llmService.js';

export const startGame = async (req, res) => {
  try {
    const { name, startupIdea, startupType, initialMoney, moneySource } = req.body;
    
    const initialState = getInitialGameState(startupIdea, startupType, Number(initialMoney), moneySource);
    
    // Generate the first scenario immediately
    const firstScenario = await generateScenario(initialState);
    initialState.lastScenario = firstScenario;

    // Use DB or simulate ID for local dev if DB disconnected
    if (process.env.MONGO_URI) {
        const game = new Game({ ...initialState, userId: name || 'anonymous' });
        await game.save();
        res.status(201).json({ success: true, gameId: game._id, state: game });
    } else {
        // Fallback for in-memory / testing
        const simulatedId = Date.now().toString();
        const state = { ...initialState, _id: simulatedId, userId: name };
        global.mockDB = global.mockDB || {};
        global.mockDB[simulatedId] = state;
        res.status(201).json({ success: true, gameId: simulatedId, state });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getGameDashboard = async (req, res) => {
  try {
    const { id } = req.params;
    let game;
    if (process.env.MONGO_URI) {
      game = await Game.findById(id);
    } else {
      game = global.mockDB?.[id];
    }

    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    
    res.json({ success: true, game });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const processDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;

    let game;
    if (process.env.MONGO_URI) {
      game = await Game.findById(id);
    } else {
      game = global.mockDB?.[id];
    }

    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    if (game.gameStatus !== 'active') return res.status(400).json({ success: false, message: 'Game already ended' });

    // Find the option user selected
    const selectedOption = game.lastScenario?.options.find(opt => opt.id === optionId);
    if (!selectedOption) return res.status(400).json({ success: false, message: 'Invalid option' });

    // Save history
    game.history.push({
      stage: game.stage,
      scenario: game.lastScenario.scenario,
      decision: selectedOption.title,
      impact: selectedOption.impact
    });

    // Apply deterministic state changes
    game = applyDecision(game, selectedOption);

    // After applying, if still active, trigger random event and next AI scenario
    let randomEvent = null;
    if (game.gameStatus === 'active') {
      randomEvent = checkRandomEvent(game);
      // Wait wait, checkRandomEvent modifies state, we must check bounds again or let gameEngine do bounds check
      if (game.currentMoney <= 0 || game.stress >= 100) game.gameStatus = 'lost';
      
      if (game.gameStatus === 'active') {
         const nextScenario = await generateScenario(game);
         game.lastScenario = nextScenario;
      }
    }

    if (game.gameStatus !== 'active' && !game.summary) {
      game.summary = await generateGameSummary(game);
    }

    if (process.env.MONGO_URI) {
      await game.save(); // Added 'await' as missing in provided logic potentially, wait actually the object was returned raw, wait no await game.save() handles it.
    } else {
      global.mockDB[id] = game;
    }

    res.json({ 
        success: true, 
        game, 
        randomEvent, 
        message: randomEvent ? `Event trigger: ${randomEvent.name}` : 'Decision applied' 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const processCustomDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { customAnswer } = req.body;

    let game;
    if (process.env.MONGO_URI) {
      game = await Game.findById(id);
    } else {
      game = global.mockDB?.[id];
    }

    if (!game) return res.status(404).json({ success: false, message: 'Game not found' });
    if (game.gameStatus !== 'active') return res.status(400).json({ success: false, message: 'Game already ended' });
    if (!customAnswer || !customAnswer.trim()) return res.status(400).json({ success: false, message: 'Custom answer required' });

    // Evaluate the custom string and generate next scenario all at once using LLM
    const combinedResult = await generateCustomScenario(game, customAnswer);

    // Create a normalized custom option
    const customOption = {
      id: 999,
      title: combinedResult.customImpact.title || "Custom Action",
      desc: combinedResult.customImpact.desc || "Custom approach taken",
      impactHint: combinedResult.customImpact.impactHint || "Custom",
      impact: combinedResult.customImpact.impact || { money: 0, growth: 0, stress: 0 }
    };

    // Save history
    game.history.push({
      stage: game.stage,
      scenario: game.lastScenario.scenario,
      decision: `(Custom) ${customAnswer}`,
      impact: customOption.impact
    });

    // Apply deterministic state changes
    game = applyDecision(game, customOption);

    // Trigger next steps
    let randomEvent = null;
    if (game.gameStatus === 'active') {
      randomEvent = checkRandomEvent(game);
      if (game.currentMoney <= 0 || game.stress >= 100) game.gameStatus = 'lost';
      
      if (game.gameStatus === 'active') {
         game.lastScenario = combinedResult.nextScenario;
      }
    }

    if (game.gameStatus !== 'active' && !game.summary) {
      game.summary = await generateGameSummary(game);
    }

    if (process.env.MONGO_URI) {
      await game.save();
    } else {
      global.mockDB[id] = game;
    }

    res.json({ 
        success: true, 
        game, 
        randomEvent, 
        message: randomEvent ? `Event trigger: ${randomEvent.name}` : 'Custom decision applied' 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
