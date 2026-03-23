export interface ScenarioOption {
  id: number;
  title: string;
  desc: string;
  impactHint: string;
  impact: {
    money: number;
    growth: number;
    stress: number;
  };
}

export interface Scenario {
  scenario: string;
  options: ScenarioOption[];
}

export interface HistoryEntry {
  stage: number;
  scenario: string;
  decision: string;
  impact: {
    money: number;
    growth: number;
    stress: number;
  };
}

export interface GameState {
  _id: string;
  userId: string;
  startupIdea: string;
  initialMoney: number;
  currentMoney: number;
  moneySource: string;
  growth: number;
  stress: number;
  stage: number;
  history: HistoryEntry[];
  gameStatus: 'active' | 'won' | 'lost';
  lastScenario?: Scenario;
  summary?: string;
}