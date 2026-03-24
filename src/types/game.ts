export interface ScenarioOption {
  id: number;
  title: string;
  desc: string;
  impactHint: string;
  impact: {
    money: number;
    growth: number;
    stress: number;
    burn?: number;
    morale?: number;
    pmf?: number;
    trust?: number;
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
    burn?: number;
    morale?: number;
    pmf?: number;
    trust?: number;
  };
}

export interface GameState {
  _id: string;
  userId: string;
  startupIdea: string;
  startupType: string;
  initialMoney: number;
  currentMoney: number;
  monthlyBurn: number;
  moneySource: string;
  growth: number;
  stress: number;
  teamMorale: number;
  productMarketFit: number;
  marketTrust: number;
  stage: number;
  history: HistoryEntry[];
  gameStatus: 'active' | 'running' | 'struggling' | 'pivot' | 'won' | 'lost';
  lastScenario?: Scenario;
  summary?: string;
}