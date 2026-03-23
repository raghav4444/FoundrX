export const getInitialGameState = (startupIdea, startupType, initialMoney, moneySource) => {
  let stress = 0;
  let growth = 0;

  // Apply money source modifiers
  switch (moneySource) {
    case 'savings':
      stress += 10;
      break;
    case 'friend_loan':
      stress += 15;
      break;
    case 'bank_loan':
      stress += 20;
      break;
    case 'investor':
      growth += 10;
      stress += 15;
      break;
    case 'hackathon':
      growth += 5;
      break;
    default:
      break;
  }

  return {
    startupIdea,
    startupType,
    initialMoney,
    currentMoney: initialMoney,
    moneySource,
    growth,
    stress,
    stage: 1,
    gameStatus: 'active',
    history: [],
    lastScenario: null
  };
};

export const applyDecision = (gameState, optionData) => {
  const { money = 0, growth = 0, stress = 0 } = optionData.impact || {};
  
  // Deterministic math logic update
  gameState.currentMoney += money;
  gameState.growth += growth;
  gameState.stress += stress;
  gameState.stage += 1;

  // Bound checks
  if (gameState.currentMoney < 0) {
    gameState.currentMoney = 0;
  }
  if (gameState.stress > 100) {
    gameState.stress = 100;
  }
  if (gameState.growth < 0) {
    gameState.growth = 0;
  }

  // Check Game Over or Win
  if (gameState.currentMoney < 0 || gameState.stress >= 100) {
    gameState.gameStatus = 'lost';
  } else if (gameState.growth >= 100) {
    // Reached 100% growth target
    if (gameState.currentMoney > (gameState.initialMoney * 0.2)) {
      gameState.gameStatus = 'won';
    } else {
      // Unprofitable growth explosion (Pyrrhic victory)
      gameState.gameStatus = 'lost';
    }
  } else if (gameState.stage > 10) {
    // Reached end of simulation runway
    if (gameState.growth >= 50 && gameState.currentMoney >= (gameState.initialMoney * 0.5)) {
      gameState.gameStatus = 'won';
    } else {
      // Failed to gain enough traction or burned too much capital
      gameState.gameStatus = 'lost';
    }
  }

  return gameState;
};

export const checkRandomEvent = (gameState) => {
  // 30% probability trigger
  const rnd = Math.random();
  if (rnd > 0.3) return null; // No event

  const events = [
    { name: 'Server Crash!', money: -500, stress: +10, growth: 0, desc: 'Your cloud provider went down. You lost some revenue and gained stress.' },
    { name: 'Viral Post!', money: +1000, stress: -5, growth: +15, desc: 'A post about your startup went viral on social media!' },
    { name: 'Cofounder Leaves', money: 0, stress: +20, growth: -5, desc: 'Your cofounder decided to quit and take a corporate job.' },
    { name: 'Surprise Grant', money: +5000, stress: -10, growth: +5, desc: 'You won a small startup grant!' }
  ];

  const event = events[Math.floor(Math.random() * events.length)];
  
  // Apply immediately to state
  gameState.currentMoney += event.money;
  gameState.growth += event.growth;
  gameState.stress += event.stress;
  
  return event;
};
