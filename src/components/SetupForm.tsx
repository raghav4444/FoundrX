import { useState } from 'react';
import { Rocket, DollarSign, Lightbulb } from 'lucide-react';

interface SetupFormProps {
  onSubmit: (data: {
    name: string;
    startupIdea: string;
    startupType: string;
    initialMoney: number;
    moneySource: string;
  }) => void;
  loading: boolean;
}

const MONEY_SOURCES = [
  { value: 'savings', label: 'Personal Savings', desc: 'Safe but stressful', stress: '+10' },
  { value: 'family', label: 'Family Money', desc: 'Pressure to succeed', stress: '+15' },
  { value: 'friend_loan', label: 'Friend Loan', desc: 'Risky relationships', stress: '+20' },
  { value: 'bank_loan', label: 'Bank Loan', desc: 'Debt with interest', stress: '+25' },
  { value: 'investor', label: 'Angel Investor', desc: 'Extra cash, high expectations', bonus: '+$5K', stress: '+20' },
  { value: 'hackathon', label: 'Hackathon Prize', desc: 'Recognition boost', bonus: '+Rep' },
];

const STARTUP_TYPES = [
  'AI & SaaS',
  'E-commerce',
  'Fintech',
  'EdTech',
  'HealthTech',
  'Sustainability',
  'Gaming & Entertainment',
  'Hardware',
];

export default function SetupForm({ onSubmit, loading }: SetupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    startupIdea: '',
    startupType: STARTUP_TYPES[0],
    initialMoney: 10000,
    moneySource: 'savings',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.startupIdea.trim()) {
      newErrors.startupIdea = 'Startup idea is required';
    }

    if (formData.initialMoney < 0) {
      newErrors.initialMoney = 'Cannot start with negative money';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-liquid-dark text-liquid-text flex items-center justify-center p-4">
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-liquid-accent2 to-cyan-500 rounded-2xl items-center justify-center mb-4 shadow-glass-glow">
            <Rocket className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-gradient">Setup Your Startup</h1>
          <p className="text-gray-400">Every great company starts with an idea and some money</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <span>Your Name</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-liquid-glassBorder rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-liquid-accent2 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-liquid-accent1 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Startup Idea</span>
            </label>
            <textarea
              value={formData.startupIdea}
              onChange={(e) => setFormData({ ...formData, startupIdea: e.target.value })}
              className="w-full px-4 py-3 bg-black/50 border border-liquid-glassBorder rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-liquid-accent2 focus:border-transparent transition-all resize-none"
              placeholder="Describe your startup idea (e.g., AI-powered fitness app)"
              rows={3}
            />
            {errors.startupIdea && (
              <p className="text-liquid-accent1 text-sm mt-1">{errors.startupIdea}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Rocket className="w-4 h-4" />
              <span>Industry / Type</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {STARTUP_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, startupType: type })}
                  className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    formData.startupType === type
                      ? 'border-liquid-accent2 bg-liquid-accent2/20 text-white'
                      : 'border-liquid-glassBorder bg-black/30 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Initial Capital: ${formData.initialMoney.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={formData.initialMoney}
              onChange={(e) => setFormData({ ...formData, initialMoney: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-liquid-accent2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$50K</span>
            </div>
            {errors.initialMoney && (
              <p className="text-liquid-accent1 text-sm mt-1">{errors.initialMoney}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-3 block">
              Money Source
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MONEY_SOURCES.map((source) => (
                <button
                  key={source.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, moneySource: source.value })}
                  className={`p-4 rounded-xl border transition-all text-left ${formData.moneySource === source.value
                      ? 'border-liquid-accent2 bg-liquid-accent2/10 shadow-[0_0_15px_rgba(0,247,255,0.2)]'
                      : 'border-liquid-glassBorder bg-black/30 hover:bg-black/50'
                    }`}
                >
                  <div className="font-medium text-white mb-1">{source.label}</div>
                  <div className="text-sm text-gray-400">{source.desc}</div>
                  <div className="flex gap-2 mt-2">
                    {source.stress && (
                      <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                        {source.stress} stress
                      </span>
                    )}
                    {source.bonus && (
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                        {source.bonus}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-liquid"
          >
            {loading ? 'Creating Game...' : 'Start Building'}
          </button>
        </form>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-liquid-accent1/20 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
    </div>
  );
}