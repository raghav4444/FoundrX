import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, UserCircle2, Loader2, Zap, Flame, Users, Target, ShieldCheck } from 'lucide-react';
import { GameState } from '../types/game';

interface GameDashboardProps {
  gameId: string;
  onGameEnd: (game: GameState) => void;
}

const VITE_API_URL = (import.meta.env.VITE_API_BASE_URL || 'https://foundrx-1.onrender.com').replace(/\/+$/, '');
const API_BASE = `${VITE_API_URL}/api`;

export default function GameDashboard({ gameId, onGameEnd }: GameDashboardProps) {
  const [game, setGame] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [deciding, setDeciding] = useState(false);
  const [randomEvent, setRandomEvent] = useState<{name: string, desc: string} | null>(null);
  const [eventVisible, setEventVisible] = useState(false);
  const [customAnswer, setCustomAnswer] = useState('');

  useEffect(() => {
    loadGame();
  }, [gameId]);

  const loadGame = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/dashboard/${gameId}`);
      const data = await response.json();

      if (data.success) {
        setGame(data.game);

        if (['won', 'lost', 'pivot'].includes(data.game.gameStatus) || data.game.gameStatus === 'active') { // Active is technically old, handle just in case
          if (data.game.gameStatus !== 'running' && data.game.gameStatus !== 'struggling') {
            onGameEnd(data.game);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    } finally {
      setLoading(false);
    }
  };

  const makeDecision = async (optionId: number) => {
    if (!game) return;

    setDeciding(true);
    setRandomEvent(null);

    try {
      const response = await fetch(`${API_BASE}/decision/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId }),
      });

      const data = await response.json();

      if (data.success) {
        setGame(data.game);

        if (data.randomEvent) {
          setRandomEvent(data.randomEvent);
          setEventVisible(true);
          setTimeout(() => setEventVisible(false), 4000);
        }

        if (data.game.gameStatus !== 'active') {
          setTimeout(() => onGameEnd(data.game), 10000);
        }
      }
    } catch (error) {
      console.error('Failed to make decision:', error);
    } finally {
      setDeciding(false);
    }
  };

  const makeCustomDecision = async (customText: string) => {
    if (!game || !customText.trim()) return;

    setDeciding(true);
    setRandomEvent(null);

    try {
      const response = await fetch(`${API_BASE}/decision/custom/${gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customAnswer: customText }),
      });

      const data = await response.json();

      if (data.success) {
        setGame(data.game);
        setCustomAnswer(''); // clear input

        if (data.randomEvent) {
          setRandomEvent(data.randomEvent);
          setEventVisible(true);
          setTimeout(() => setEventVisible(false), 4000);
        }

        if (data.game.gameStatus !== 'active') {
          setTimeout(() => onGameEnd(data.game), 10000);
        }
      }
    } catch (error) {
      console.error('Failed to make custom decision:', error);
    } finally {
      setDeciding(false);
    }
  };

  if (loading || !game) {
    return (
      <div className="min-h-screen bg-liquid-dark text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-liquid-accent2 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your startup...</p>
        </div>
      </div>
    );
  }

  const getStatColor = (value: number, inverse = false) => {
    if (inverse) {
      if (value >= 70) return 'text-liquid-accent1';
      if (value >= 40) return 'text-orange-400';
      return 'text-emerald-400';
    } else {
      if (value >= 70) return 'text-emerald-400';
      if (value >= 40) return 'text-orange-400';
      return 'text-liquid-accent1';
    }
  };

  return (
    <div className="min-h-screen bg-liquid-dark text-white p-4 md:p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-liquid-accent2/10 rounded-full blur-[120px] pointer-events-none" />

      {eventVisible && randomEvent && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="glass-panel border-liquid-accent1/50 bg-gradient-to-r from-liquid-accent1/20 to-orange-500/20 px-6 py-4 rounded-xl shadow-glass-glow max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-yellow-400" />
              <p className="font-bold text-lg">{randomEvent.name}</p>
            </div>
            <p className="text-sm text-gray-200">{randomEvent.desc}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {game.startupIdea}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <UserCircle2 className="w-4 h-4" /> {game.userId} • Month {game.stage}
            </div>
          </div>
          <span className={`glass-panel px-4 py-1 text-sm font-medium uppercase border shadow-[0_0_10px_rgba(0,247,255,0.2)] ${
            game.gameStatus === 'struggling' ? 'text-red-400 border-red-400/30' : 
            game.gameStatus === 'pivot' ? 'text-yellow-400 border-yellow-400/30' :
            'text-liquid-accent2 border-liquid-accent2/30'
          }`}>
            Status: {game.gameStatus.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 md:p-6 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Capital</span>
              </div>
            </div>
            <p className={`text-2xl md:text-3xl font-black tracking-tight ${game.currentMoney < (game.monthlyBurn || 0) * 2 ? 'text-red-400' : 'text-white'}`}>
              ${game.currentMoney.toLocaleString()}
            </p>
            <div className="text-xs text-gray-500 mt-1 font-mono flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" /> Burn: ${(game.monthlyBurn || 5000).toLocaleString()}/mo
            </div>
          </div>

          <div className="glass-panel p-4 md:p-6 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-liquid-accent2" />
              <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Growth</span>
            </div>
            <p className={`text-2xl md:text-3xl font-black tracking-tight ${getStatColor(game.growth)}`}>
              {game.growth}%
            </p>
          </div>

          <div className="glass-panel p-4 md:p-6 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Stress</span>
            </div>
            <p className={`text-2xl md:text-3xl font-black tracking-tight ${getStatColor(game.stress, true)}`}>
              {game.stress}%
            </p>
          </div>

          <div className="glass-panel p-4 md:p-6 transform hover:-translate-y-1 transition-transform">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-pink-400" />
              <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Morale</span>
            </div>
            <p className={`text-2xl md:text-3xl font-black tracking-tight ${getStatColor(game.teamMorale || 50)}`}>
              {game.teamMorale || 50}%
            </p>
          </div>
          
          <div className="glass-panel p-4 md:p-6 transform hover:-translate-y-1 transition-transform col-span-2">
             <div className="flex flex-col md:flex-row justify-between h-full gap-4">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-purple-400" />
                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Product-Market Fit</span>
                  </div>
                  <div className="flex items-end gap-2 mt-auto">
                    <p className={`text-2xl md:text-3xl font-black tracking-tight ${getStatColor(game.productMarketFit || 30)}`}>
                      {game.productMarketFit || 30}%
                    </p>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full mb-1.5 overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${Math.min(game.productMarketFit || 30, 100)}%` }} />
                    </div>
                  </div>
               </div>
               <div className="w-px bg-white/10 hidden md:block"></div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-bold">Market Trust</span>
                  </div>
                  <div className="flex items-end gap-2 mt-auto">
                    <p className={`text-2xl md:text-3xl font-black tracking-tight ${getStatColor(game.marketTrust || 20)}`}>
                      {game.marketTrust || 20}%
                    </p>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full mb-1.5 overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(game.marketTrust || 20, 100)}%` }} />
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {game.lastScenario ? (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-8 border-l-4 border-l-liquid-accent1 border-t-0 border-r-0 border-b-0 rounded-l-none">
              <h2 className="text-xs uppercase tracking-widest text-liquid-textMuted mb-2">Incoming Challenge</h2>
              <p className="text-xl text-white leading-relaxed font-medium">{game.lastScenario.scenario}</p>
            </div>

            <p className="text-xl font-bold text-liquid-accent2 mb-4 text-center">What would you do now?</p>
            <div className="grid md:grid-cols-3 gap-6 pt-2">
              {game.lastScenario.options.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => makeDecision(option.id)}
                  disabled={deciding}
                  className="glass-panel p-6 text-left hover:border-liquid-accent2 hover:bg-white/5 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:text-liquid-accent2 transition-all">
                    <Zap className="w-12 h-12" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-liquid-accent2 transition-colors relative z-10 pr-6">
                    {index + 1}. {option.title}
                  </h3>
                  <p className="text-liquid-textMuted text-sm mb-6 leading-relaxed relative z-10 flex-grow">{option.desc}</p>

                  <div className="mt-auto relative z-10 flex flex-wrap gap-2">
                    <span className={`text-xs px-3 py-1.5 rounded-md font-medium bg-black/50 border border-white/5 ${
                      String(option.impactHint).toLowerCase().includes('high cost') 
                        ? 'text-liquid-accent1' 
                        : String(option.impactHint).toLowerCase().includes('stress') 
                        ? 'text-orange-400' 
                        : 'text-liquid-accent2'
                    }`}>
                      {option.impactHint}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 max-w-3xl mx-auto glass-panel p-6">
              <h3 className="text-md font-bold mb-3 text-gray-300">Or type your personal answer:</h3>
              <textarea
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-liquid-accent2 outline-none resize-none"
                rows={3}
                placeholder="E.g., I will negotiate a better deal by..."
                value={customAnswer}
                onChange={(e) => setCustomAnswer(e.target.value)}
                disabled={deciding}
              />
              <button
                disabled={deciding || !customAnswer.trim()}
                onClick={() => makeCustomDecision(customAnswer)}
                className="btn-liquid mt-3 px-6 py-2 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                Submit Personal Answer
              </button>
            </div>

            {deciding && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center p-8 glass-panel animate-pulse">
                  <Loader2 className="w-12 h-12 text-liquid-accent2 animate-spin mx-auto mb-4" />
                  <p className="text-white font-bold tracking-wide text-lg">AI is evaluating your decision...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center border-dashed border-liquid-glassBorder">
            <Loader2 className="w-8 h-8 text-liquid-accent2 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Waiting for AI scenario generation...</p>
          </div>
        )}
      </div>
    </div>
  );
}