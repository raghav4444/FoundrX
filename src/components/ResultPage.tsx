import { Trophy, XCircle, DollarSign, TrendingUp, Users, RotateCcw, Home } from 'lucide-react';
import { GameState } from '../types/game';

interface ResultPageProps {
  game: GameState;
  onRestart: () => void;
  onHome: () => void;
}

export default function ResultPage({ game, onRestart, onHome }: ResultPageProps) {
  const isSuccess = game.gameStatus === 'won';

  const getMessage = () => {
    if (game.currentMoney <= 0) {
      return {
        title: 'Out of Money',
        subtitle: 'You ran out of runway. Cash management is crucial for startups.',
        icon: XCircle,
        color: 'text-liquid-accent1',
        bgGradient: 'from-liquid-accent1/20 to-orange-500/20',
        borderColor: 'border-liquid-accent1/30'
      };
    }

    if (game.stress >= 100) {
      return {
        title: 'Burnout',
        subtitle: 'The pressure became too much. Remember to take care of yourself.',
        icon: XCircle,
        color: 'text-orange-400',
        bgGradient: 'from-orange-500/20 to-liquid-accent1/20',
        borderColor: 'border-orange-500/30'
      };
    }

    if (isSuccess) {
      if (game.growth >= 1000) {
        return {
          title: 'Unicorn Status!',
          subtitle: 'You built a massively successful startup with a huge user base!',
          icon: Trophy,
          color: 'text-emerald-400',
          bgGradient: 'from-emerald-500/20 to-cyan-500/20',
          borderColor: 'border-emerald-500/30'
        };
      }
      return {
        title: 'Success!',
        subtitle: 'You built a thriving and profitable startup. Well done!',
        icon: Trophy,
        color: 'text-liquid-accent2',
        bgGradient: 'from-liquid-accent2/20 to-blue-500/20',
        borderColor: 'border-liquid-accent2/30'
      };
    }

    return {
      title: 'Failed to Gain Traction',
      subtitle: 'Your startup struggled to find product-market fit.',
      icon: XCircle,
      color: 'text-liquid-accent1',
      bgGradient: 'from-liquid-accent1/20 to-orange-500/20',
      borderColor: 'border-liquid-accent1/30'
    };
  };

  const result = getMessage();

  return (
    <div className="min-h-screen bg-liquid-dark text-white p-4 md:p-8 selection:bg-liquid-accent1/30 selection:text-white">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-gradient-to-r ${result.bgGradient} border ${result.borderColor} rounded-3xl p-12 text-center mb-12 shadow-glass relative overflow-hidden`}>
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <result.icon className="w-64 h-64" />
          </div>
          
          <result.icon className={`w-24 h-24 ${result.color} mx-auto mb-6 relative z-10 drop-shadow-lg`} />
          <h1 className="text-5xl font-extrabold mb-4 relative z-10 tracking-tight">{result.title}</h1>
          <p className="text-xl text-gray-300 mb-8 relative z-10 max-w-2xl mx-auto">{result.subtitle}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
            <div className="glass-panel p-4">
              <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-black">${game.currentMoney.toLocaleString()}</p>
              <p className="text-xs tracking-wider text-gray-400 uppercase mt-1">Final Capital</p>
            </div>

            <div className="glass-panel p-4">
              <TrendingUp className="w-6 h-6 text-liquid-accent2 mx-auto mb-2" />
              <p className="text-2xl font-black">{game.growth}%</p>
              <p className="text-xs tracking-wider text-gray-400 uppercase mt-1">Growth</p>
            </div>

            <div className="glass-panel p-4">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-black">{game.stress}%</p>
              <p className="text-xs tracking-wider text-gray-400 uppercase mt-1">Final Stress</p>
            </div>

            <div className="glass-panel p-4">
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-black">M{game.stage}</p>
              <p className="text-xs tracking-wider text-gray-400 uppercase mt-1">Months Survived</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              onClick={onRestart}
              className="btn-liquid flex items-center gap-2 justify-center"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>

            <button
              onClick={onHome}
              className="btn-outline-glass flex items-center gap-2 justify-center"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>
        </div>

        {game.summary && (
          <div className="glass-panel p-8 mb-8 relative overflow-hidden border-liquid-accent2/30 shadow-[0_0_15px_rgba(0,247,255,0.1)]">
             <div className="absolute -top-4 -right-4 p-4 opacity-5 pointer-events-none">
               <Trophy className="w-48 h-48" />
             </div>
             <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-liquid-accent2">
                <TrendingUp className="text-liquid-accent2" /> AI Post-Mortem Analysis
             </h2>
             <p className="text-gray-200 leading-relaxed relative z-10 text-lg">
                {game.summary}
             </p>
          </div>
        )}

        {game.history && game.history.length > 0 && (
          <div className="glass-panel p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <TrendingUp className="text-liquid-accent2" /> Your Journey Log
            </h2>

            <div className="space-y-6">
              {game.history.map((entry, index) => (
                <div key={index} className="border-l-2 border-liquid-glassBorder pl-6 pb-2 relative group">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-liquid-dark border-2 border-liquid-accent2 rounded-full group-hover:bg-liquid-accent2 transition-colors shadow-[0_0_10px_rgba(0,247,255,0.5)]"></div>

                  <div className="bg-black/40 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-4">
                      <div>
                        <p className="text-xs font-bold text-liquid-accent2 mb-1 tracking-widest uppercase">Month {entry.stage}</p>
                        <p className="text-gray-300 text-sm mb-2">{entry.scenario}</p>
                        <p className="font-bold text-white flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-white opacity-50"></span> 
                           {entry.decision}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs font-medium shrink-0">
                        {entry.impact.money !== 0 && (
                          <span className={`px-2.5 py-1 rounded-md border ${
                            entry.impact.money > 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {entry.impact.money > 0 ? '+' : ''}{entry.impact.money > 0 ? '$' : '-$'}{Math.abs(entry.impact.money).toLocaleString()}
                          </span>
                        )}

                        {entry.impact.growth !== 0 && (
                          <span className={`px-2.5 py-1 rounded-md border ${
                            entry.impact.growth > 0 ? 'bg-liquid-accent2/10 text-liquid-accent2 border-liquid-accent2/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {entry.impact.growth > 0 ? '+' : ''}{entry.impact.growth}% growth
                          </span>
                        )}

                        {entry.impact.stress !== 0 && (
                          <span className={`px-2.5 py-1 rounded-md border ${
                            entry.impact.stress > 0 ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-green-500/10 text-emerald-400 border-green-500/20'
                          }`}>
                            {entry.impact.stress > 0 ? '+' : ''}{entry.impact.stress}% stress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}