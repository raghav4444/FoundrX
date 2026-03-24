export const getInitialGameState = (startupIdea, startupType, initialMoney, moneySource) => {
  let stress = 0;
  let growth = 0;
  let monthlyBurn = 5000;
  let teamMorale = 60;
  let productMarketFit = 30;
  let marketTrust = 20;

  // Apply money source modifiers
  switch (moneySource) {
    case 'savings':
      stress += 10;
      teamMorale += 5; // Direct control, better morale early on
      break;
    case 'friend_loan':
      stress += 15;
      marketTrust -= 5; // Friends don't instill market trust
      break;
    case 'bank_loan':
      stress += 20;
      monthlyBurn += 500; // Loan interest
      break;
    case 'investor':
      growth += 10;
      stress += 15;
      marketTrust += 20; // Investors bring credibility
      monthlyBurn += 2000; // Higher expectations, higher burn
      break;
    case 'hackathon':
      growth += 5;
      teamMorale += 10;
      marketTrust += 10;
      break;
    default:
      break;
  }

  return {
    startupIdea,
    startupType,
    initialMoney,
    currentMoney: initialMoney,
    monthlyBurn,
    moneySource,
    growth,
    stress,
    teamMorale,
    productMarketFit,
    marketTrust,
    stage: 1,
    gameStatus: 'running',
    history: [],
    lastScenario: null
  };
};

function evaluateGameStatus(gameState) {
  const monthlyBurn = Math.max(gameState.monthlyBurn || 1, 1);
  const runway = gameState.currentMoney / monthlyBurn;
  const growthScore = gameState.growth || 0;
  const stress = gameState.stress || 0;
  const moraleScore = gameState.teamMorale ?? 50;
  const productScore = gameState.productMarketFit ?? 50;
  const reputationScore = gameState.marketTrust ?? 50;

  // Instant collapse conditions
  if (gameState.currentMoney <= 0) {
    return 'lost'; // out of cash
  }

  if (stress >= 100 && moraleScore <= 20) {
    return 'lost'; // founder/team burnout collapse
  }

  // Stage-based expectations
  let requiredGrowth = 0;
  let requiredRunway = 0;
  let requiredProductScore = 0;

  if (gameState.stage <= 3) {
    requiredGrowth = 20;
    requiredRunway = 3;
    requiredProductScore = 40;
  } else if (gameState.stage <= 7) {
    requiredGrowth = 45;
    requiredRunway = 4;
    requiredProductScore = 55;
  } else {
    requiredGrowth = 65;
    requiredRunway = 6;
    requiredProductScore = 70;
  }

  const stressPenalty = Math.max(0, stress - 60);

  const healthScore =
    (growthScore * 0.30) +
    ((Math.min(runway, 12) / 12) * 100 * 0.25) +
    (productScore * 0.20) +
    (moraleScore * 0.15) +
    (reputationScore * 0.10) -
    (stressPenalty * 0.50);

  // Endgame evaluation
  const reachedEnd = gameState.stage > 10;

  if (reachedEnd) {
    // Best simplified win formula based on user request
    if (
      runway >= 6 &&
      growthScore >= 60 &&
      productScore >= 65 &&
      stress < 80
    ) {
      return 'won';
    }
    
    // Alternative check using the complex weighted score just in case
    if (
      growthScore >= requiredGrowth &&
      runway >= requiredRunway &&
      productScore >= requiredProductScore &&
      healthScore >= 65
    ) {
      return 'won'; // sustainable company
    }

    if (
      growthScore >= requiredGrowth * 0.7 &&
      runway >= 2 &&
      healthScore >= 45
    ) {
      return 'pivot'; // survived, but needs change
    }

    return 'lost';
  }

  // Mid-game warnings / ongoing state
  if (runway < 2 || stress > 85) {
    return 'struggling';
  }

  return 'running';
}

export const applyDecision = (gameState, optionData) => {
  const { money = 0, growth = 0, stress = 0, burn = 0, morale = 0, pmf = 0, trust = 0 } = optionData.impact || {};
  
  // Deterministic logic update
  gameState.currentMoney += money;
  if (!gameState.monthlyBurn) gameState.monthlyBurn = 5000;
  gameState.monthlyBurn += burn;
  gameState.growth += growth;
  gameState.stress += stress;
  
  if (gameState.teamMorale === undefined) gameState.teamMorale = 50;
  if (gameState.productMarketFit === undefined) gameState.productMarketFit = 30;
  if (gameState.marketTrust === undefined) gameState.marketTrust = 20;

  gameState.teamMorale += morale;
  gameState.productMarketFit += pmf;
  gameState.marketTrust += trust;

  // Monthly burn logic
  gameState.currentMoney -= gameState.monthlyBurn;
  gameState.stage += 1;

  // Bound checks
  if (gameState.currentMoney < 0) gameState.currentMoney = 0;
  if (gameState.monthlyBurn < 500) gameState.monthlyBurn = 500;
  if (gameState.stress > 100) gameState.stress = 100;
  if (gameState.stress < 0) gameState.stress = 0;
  if (gameState.growth < 0) gameState.growth = 0;
  if (gameState.growth > 100) gameState.growth = 100;
  if (gameState.teamMorale > 100) gameState.teamMorale = 100;
  if (gameState.teamMorale < 0) gameState.teamMorale = 0;
  if (gameState.productMarketFit > 100) gameState.productMarketFit = 100;
  if (gameState.productMarketFit < 0) gameState.productMarketFit = 0;
  if (gameState.marketTrust > 100) gameState.marketTrust = 100;
  if (gameState.marketTrust < 0) gameState.marketTrust = 0;

  gameState.gameStatus = evaluateGameStatus(gameState);

  return gameState;
};

export const checkRandomEvent = (gameState) => {
  // 30% probability trigger
  const rnd = Math.random();
  if (rnd > 0.3) return null; // No event

  const events = [
    { name: 'Server Crash!', money: -500, stress: +10, growth: 0, pmf: -2, desc: 'Your cloud provider went down. You lost some revenue, trust, and gained stress.' },
    { name: 'Viral Post!', money: +1000, stress: -5, growth: +15, trust: +5, desc: 'A post about your startup went viral on social media!' },
    { name: 'Cofounder Leaves', money: 0, stress: +20, growth: -5, morale: -30, desc: 'Your cofounder decided to quit and take a corporate job.' },
    { name: 'Surprise Grant', money: +5000, stress: -10, growth: +5, morale: +10, desc: 'You won a small startup grant!' }
  ];

  const event = events[Math.floor(Math.random() * events.length)];
  
  // Apply immediately to state
  gameState.currentMoney += event.money || 0;
  gameState.growth += event.growth || 0;
  gameState.stress += event.stress || 0;
  if(event.morale) gameState.teamMorale += event.morale;
  if(event.pmf) gameState.productMarketFit += event.pmf;
  if(event.trust) gameState.marketTrust += event.trust;

  // bounds
  if(gameState.teamMorale < 0) gameState.teamMorale = 0;
  if(gameState.teamMorale > 100) gameState.teamMorale = 100;
  if(gameState.productMarketFit < 0) gameState.productMarketFit = 0;
  if(gameState.marketTrust < 0) gameState.marketTrust = 0;
  
  return event;
};
