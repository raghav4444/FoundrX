import { useState } from 'react';
import LandingPage from './components/LandingPage';
import SetupForm from './components/SetupForm';
import GameDashboard from './components/GameDashboard';
import ResultPage from './components/ResultPage';
import { GameState } from './types/game';

type Screen = 'landing' | 'setup' | 'game' | 'result';

const VITE_API_URL = (import.meta.env.VITE_API_BASE_URL || 'https://foundrx-1.onrender.com').replace(/\/+$/, '');
const API_BASE = `${VITE_API_URL}/api`;

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [gameId, setGameId] = useState<string | null>(null);
  const [endedGame, setEndedGame] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setScreen('setup');
  };

  const handleSetupSubmit = async (data: {
    name: string;
    startupIdea: string;
    startupType: string;
    initialMoney: number;
    moneySource: string;
  }) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setGameId(result.gameId);
        setScreen('game');
      } else {
        alert(`Server Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to create game:', error);
      alert('Failed to connect to the game server. Ensure it is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGameEnd = (game: GameState) => {
    setEndedGame(game);
    setScreen('result');
  };

  const handleRestart = () => {
    setGameId(null);
    setEndedGame(null);
    setScreen('setup');
  };

  const handleHome = () => {
    setGameId(null);
    setEndedGame(null);
    setScreen('landing');
  };

  return (
    <>
      {screen === 'landing' && <LandingPage onStart={handleStart} />}
      {screen === 'setup' && <SetupForm onSubmit={handleSetupSubmit} loading={loading} />}
      {screen === 'game' && gameId && <GameDashboard gameId={gameId} onGameEnd={handleGameEnd} />}
      {screen === 'result' && endedGame && (
        <ResultPage game={endedGame} onRestart={handleRestart} onHome={handleHome} />
      )}
    </>
  );
}

export default App;
