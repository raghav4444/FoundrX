# Build or Burn - AI Startup Simulator

An interactive, AI-driven startup simulation platform where players experience the emotional rollercoaster of building a tech startup from idea to success (or failure).

## Features

### Core Gameplay
- **Dynamic Scenarios**: AI-generated scenarios that adapt to your decisions and startup context
- **Resource Management**: Balance money, growth, stress, users, and reputation
- **Multiple Stages**: Progress from idea → MVP → growth → scale
- **Random Events**: Unexpected challenges and opportunities keep gameplay unpredictable
- **Multiple Endings**: Different success and failure states based on your performance

### Game Mechanics
- **Money Sources**: Choose from savings, family money, loans, investors, or hackathon prizes
- **Decision Impact**: Every choice affects multiple stats simultaneously
- **Stage Progression**: Automatic advancement through startup stages based on performance
- **Turn-Based Gameplay**: Make strategic decisions turn by turn
- **History Tracking**: Review all your decisions and their impacts

### Technical Features
- **AI-Powered**: Uses OpenAI for dynamic scenario generation with intelligent fallbacks
- **Supabase Backend**: Full-featured database with edge functions for game logic
- **Real-Time Updates**: Instant feedback on decisions and random events
- **Responsive Design**: Beautiful dark theme optimized for all devices
- **Smooth Animations**: Polished transitions and micro-interactions

## Game Flow

1. **Landing Page**: Learn about the game and start your journey
2. **Setup**: Define your startup idea, name, funding amount, and money source
3. **Gameplay**: Face scenarios, make decisions, manage resources
4. **Result**: See your outcome with detailed statistics and decision history

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **AI**: OpenAI GPT-4 (with fallback scenarios)
- **Icons**: Lucide React

## Database Schema

### Games Table
Stores game state including money, growth, stress, users, reputation, stage, and status.

### Game History Table
Tracks every decision made with impacts and state snapshots.

## Edge Functions

### game-engine
Handles all game logic including:
- Game creation with money source impacts
- Decision processing with deterministic calculations
- Random event triggering
- Stage progression
- Game end conditions

### ai-scenario
Generates dynamic scenarios using AI:
- Context-aware prompts based on game state
- Structured JSON output validation
- Automatic fallback to curated scenarios
- Risk-based impact calculation

## Game Balance

### Money Sources
- **Savings**: +10 stress
- **Family**: +15 stress, -5 reputation
- **Friend Loan**: +20 stress, -5 reputation
- **Bank Loan**: +25 stress, +5 reputation
- **Investor**: +$5K, +10 growth, +20 stress, +10 reputation
- **Hackathon**: +5 growth, +5 stress, +15 reputation

### Win Conditions
- Growth ≥ 100% AND Money ≥ $100K
- Stage = scale AND Users ≥ 50K

### Lose Conditions
- Money ≤ 0
- Stress ≥ 100
- Turn 20+ with Growth < 30%

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Already configured in `.env`:
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

## Game Design Philosophy

1. **User Control**: Players make all strategic decisions
2. **Backend Logic**: All calculations are deterministic and server-side
3. **AI Enhancement**: AI generates stories, not game mechanics
4. **Smooth UX**: No page reloads, instant feedback, loading states

## Future Enhancements

- User authentication and saved games
- Leaderboard system
- Multiple difficulty modes
- Analytics dashboard
- Multiplayer comparison
- More random events
- Industry-specific scenarios

## Credits

Built following professional game design principles with focus on realistic startup challenges and meaningful decision trade-offs.