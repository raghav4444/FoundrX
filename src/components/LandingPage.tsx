import React, { useMemo, useState } from "react";
import {
  Rocket,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  Play,
  ChevronDown,
  CheckCircle,
  Brain,
  DollarSign,
  Activity,
  Users,
  Star,
  ServerCrash,
  Menu,
  X,
  Sparkles,
  LineChart,
  Flame,
  Clock3,
  BadgeDollarSign,
  Target,
  Cpu,
  Gauge,
  Orbit,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface Props {
  onStart: () => void;
}

/**
 * Reusable reveal animation for sections
 */
const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/**
 * Small wrapper for animated sections
 */
const RevealSection: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = "", children }) => (
  <motion.section
    id={id}
    className={className}
    variants={sectionVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.18 }}
  >
    {children}
  </motion.section>
);

/**
 * Small reusable section heading
 */
const SectionHeader: React.FC<{
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}> = ({ eyebrow, title, description, center = true }) => (
  <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
    {eyebrow && (
      <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-liquid-textMuted mb-4">
        {eyebrow}
      </p>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-sm sm:text-base md:text-lg text-liquid-textMuted leading-7">
        {description}
      </p>
    )}
  </div>
);

/**
 * Reusable glass card
 */
const GlassCard: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children }) => (
  <div className={`glass-panel ${className}`}>{children}</div>
);

const LandingPage: React.FC<Props> = ({ onStart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  /**
   * All content moved into arrays to keep JSX cleaner and easier to maintain.
   * This also makes the component more scalable.
   */
  const navLinks = useMemo(
    () => [
      { label: "Features", href: "#features" },
      { label: "How it Works", href: "#how-it-works" },
      { label: "Demo", href: "#demo" },
      { label: "Mechanics", href: "#mechanics" },
      { label: "FAQ", href: "#faq" },
    ],
    []
  );

  const featureCards = useMemo(
    () => [
      {
        icon: Brain,
        title: "AI Scenarios",
        desc: "Every challenge adapts to your startup idea, funding style, and current situation.",
        color: "text-purple-400",
      },
      {
        icon: DollarSign,
        title: "Capital Tracking",
        desc: "Watch your runway, cash burn, and risky spending in real time.",
        color: "text-green-400",
      },
      {
        icon: AlertTriangle,
        title: "Real Decisions",
        desc: "There are no perfect choices. Just trade-offs, pressure, and consequences.",
        color: "text-yellow-400",
      },
      {
        icon: TrendingUp,
        title: "Multiple Endings",
        desc: "Get acquired, become profitable, go viral, burn out, or crash completely.",
        color: "text-blue-400",
      },
      {
        icon: Cpu,
        title: "Dynamic Funding Context",
        desc: "Bootstrap, family support, bank loan, investors — each changes the story.",
        color: "text-cyan-400",
      },
      {
        icon: Users,
        title: "Founder Identity",
        desc: "Your behavior shapes your founder archetype: builder, hustler, risk-taker, or chaos magnet.",
        color: "text-pink-400",
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        step: "01",
        title: "Start your startup",
        desc: "Choose your idea, your capital, and where the money came from.",
      },
      {
        step: "02",
        title: "Face AI challenges",
        desc: "Get realistic startup events shaped by your exact business context.",
      },
      {
        step: "03",
        title: "Make high-stakes decisions",
        desc: "Trade money, growth, stress, and survival with every move.",
      },
      {
        step: "04",
        title: "Earn your ending",
        desc: "Become legendary, stay alive, or burn your company to the ground.",
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        label: "Day 1",
        title: "The Idea",
        desc: "You define the startup, funding source, and initial runway.",
      },
      {
        label: "Week 1",
        title: "MVP Pressure",
        desc: "Ship fast, hire cheap, or stay solo and absorb the stress.",
      },
      {
        label: "Month 1",
        title: "First Users",
        desc: "Some love it. Some hate it. Feedback starts shaping your future.",
      },
      {
        label: "Month 3",
        title: "Startup Chaos",
        desc: "Downtime, churn, hiring issues, investor pressure, and market shocks.",
      },
      {
        label: "Month 6",
        title: "The Outcome",
        desc: "Exit, survive, pivot, grow, or burn. The market decides after you do.",
      },
    ],
    []
  );

  const mechanics = useMemo(
    () => [
      {
        icon: BadgeDollarSign,
        title: "Money",
        desc: "Your runway. Spend too fast and your startup dies before the market even notices you.",
      },
      {
        icon: LineChart,
        title: "Growth",
        desc: "Traction, momentum, product pull, and proof that your decisions are working.",
      },
      {
        icon: Flame,
        title: "Stress",
        desc: "Founder pressure. High stress makes survival harder and bad choices more tempting.",
      },
      {
        icon: Gauge,
        title: "Reputation",
        desc: "How users, investors, and the market perceive your startup over time.",
      },
    ],
    []
  );

  const scenarioCards = useMemo(
    () => [
      {
        icon: ServerCrash,
        title: "Server crashes",
        desc: "A cloud outage wipes out your launch momentum and angry users flood social media.",
        border: "border-t-red-500/50",
        iconColor: "text-red-400",
      },
      {
        icon: Rocket,
        title: "Your app goes viral",
        desc: "Traffic explodes overnight. So do infra bills, support tickets, and expectations.",
        border: "border-t-green-500/50",
        iconColor: "text-green-400",
      },
      {
        icon: Users,
        title: "Investor rejects your pitch",
        desc: `"This is interesting, but not venture scale." Now what?`,
        border: "border-t-yellow-500/50",
        iconColor: "text-yellow-400",
      },
      {
        icon: AlertTriangle,
        title: "Co-founder conflict",
        desc: "Your team disagrees on roadmap, ownership, and what matters most right now.",
        border: "border-t-pink-500/50",
        iconColor: "text-pink-400",
      },
    ],
    []
  );

  const liveFeed = useMemo(
    () => [
      "A founder just lost ₹20,000 on ads with zero conversions.",
      "Someone bootstrapped to profitability in month 5.",
      "A student founder got acquired after a surprise growth spike.",
      "An investor-backed startup crashed after hiring too fast.",
      "A solo founder survived by talking to users instead of running ads.",
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        text: "This actually feels like founder pressure. I started playing for fun and ended up overthinking runway like it was real.",
        author: "Alex, Aspiring Developer",
      },
      {
        text: "I liked that there were no perfect choices. Every option felt like something a startup would genuinely face.",
        author: "Sarah, Product Builder",
      },
      {
        text: "Best startup simulation concept I’ve seen for learning trade-offs between growth, money, and stress.",
        author: "Mike, PM",
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "Is this free to play?",
        a: "Yes. The base experience is free to play. You can start a simulation, make decisions, and complete runs without paying.",
      },
      {
        q: "Do I need coding skills?",
        a: "No. This is designed for anyone interested in startups, product thinking, strategy, or learning through simulation.",
      },
      {
        q: "How long is one game?",
        a: "A typical run takes around 5 to 15 minutes depending on how quickly you read, decide, and whether your startup survives.",
      },
      {
        q: "Does AI really affect the game?",
        a: "Yes. AI helps generate personalized scenarios, tone, and narrative variation based on your startup setup and decision history.",
      },
      {
        q: "Can I replay with different ideas?",
        a: "Yes. Replayability is a core part of the product. Different startup ideas, funding sources, and decisions create different outcomes.",
      },
    ],
    []
  );

  const comparisonRows = useMemo(
    () => [
      ["Theory only", "Real decisions with consequences"],
      ["Generic case studies", "AI-personalized founder scenarios"],
      ["Passive reading", "Interactive simulation"],
      ["No emotional tension", "Runway, stress, and pressure"],
    ],
    []
  );

  const founders = useMemo(
    () => [
      { rank: "#1", name: "Aarav", result: "Unicorn Exit", tone: "text-green-400" },
      { rank: "#2", name: "Riya", result: "Profitable Growth", tone: "text-cyan-400" },
      { rank: "#3", name: "Kabir", result: "Acquired", tone: "text-yellow-400" },
    ],
    []
  );

  return (
    <div id="right" className="min-h-screen relative overflow-hidden selection:bg-liquid-accent2/30 selection:text-white pb-28 md:pb-20">
      {/* Background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-liquid-accent1/20 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none" />
      <div
        className="absolute top-[18%] right-[-10%] w-[55%] h-[55%] bg-liquid-accent2/10 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-[#7c3aed]/10 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none"
        style={{ animationDelay: "4s" }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-r-0 border-l-0 border-t-0 rounded-none bg-liquid-dark/60 backdrop-blur-xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <span className="font-bold text-lg sm:text-xl tracking-wide">
              Foundr<span className="text-liquid-accent1">X</span>
            </span>
            <p className="text-[10px] sm:text-xs text-liquid-textMuted leading-none mt-0.5">
              AI Startup Simulator
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-liquid-textMuted">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <button onClick={onStart} className="btn-liquid px-5 py-2 text-sm rounded-lg">
            Play Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-4 right-4 z-40 lg:hidden"
          >
            <GlassCard className="p-4 border border-white/10 bg-liquid-dark/90 backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-liquid-textMuted hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onStart();
                  }}
                  className="btn-liquid mt-2"
                >
                  Start Simulation
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-28 sm:pt-32 relative z-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-20 sm:space-y-24 md:space-y-32">
        {/* HERO */}
        <RevealSection className="text-center pt-4 sm:pt-10 md:pt-16 space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-liquid-accent2/30 text-liquid-accent2 text-xs sm:text-sm font-semibold shadow-glass-glow">
            <Zap className="w-4 h-4" /> V2.0 AI Engine Live
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Build your startup or{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-liquid-accent1 to-orange-500">
              watch it burn
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-liquid-textMuted max-w-3xl mx-auto leading-7">
            Make founder decisions under pressure. Manage your runway. Absorb the
            chaos. Respond to AI-generated startup situations that feel personal,
            tense, and dangerously real.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onStart}
              className="btn-liquid w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" /> Start Simulation
            </button>

            <a
              href="#demo"
              className="btn-outline-glass w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </a>
          </div>

          {/* Mini stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-4xl mx-auto">
            {[
              ["1k+", "Simulations"],
              ["50+", "Endings"],
              ["AI", "Scenario Engine"],
              ["5–15m", "Avg Session"],
            ].map(([value, label]) => (
              <GlassCard key={label} className="p-4 sm:p-5 text-center">
                <div className="text-xl sm:text-2xl font-black text-white">{value}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-liquid-textMuted mt-1">
                  {label}
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* TRUST */}
        <RevealSection className="space-y-6">
          <SectionHeader
            eyebrow="Trust & Credibility"
            title="Designed to feel like startup pressure, not a generic quiz"
            description="Fast-paced, replayable, and built for aspiring founders, students, and builders who want to experience how startup decisions actually compound."
          />

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              { icon: Brain, text: "AI Powered", color: "text-liquid-accent2" },
              { icon: Activity, text: "Realistic Simulation", color: "text-green-400" },
              { icon: Shield, text: "Beginner Friendly", color: "text-blue-400" },
              { icon: Orbit, text: "Replayable Runs", color: "text-purple-400" },
            ].map((item) => (
              <GlassCard
                key={item.text}
                className="px-4 py-3 flex items-center gap-2 text-sm text-gray-300"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                {item.text}
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* PROBLEM */}
        <RevealSection className="max-w-5xl mx-auto">
          <GlassCard className="p-6 sm:p-10 md:p-14 border-liquid-accent1/20 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-liquid-accent1 to-transparent opacity-50" />
            <SectionHeader
              title="Most people love startup content. Very few ever feel startup consequences."
              description="Watching videos about startups is easy. Living through trade-offs is not. What do you do when your launch fails, your ads flop, your investors hesitate, and your runway shrinks every week?"
            />
            <p className="text-base sm:text-lg text-white font-medium">This simulation makes that pressure tangible.</p>
          </GlassCard>
        </RevealSection>

        {/* SOLUTION */}
        <RevealSection className="text-center space-y-6">
          <SectionHeader
            eyebrow="The Solution"
            title="A simulation where you become the founder"
            description="You choose the startup idea. You define the starting capital. You decide where the money came from. The AI and simulation engine turn those choices into a founder journey with real tension."
          />
        </RevealSection>

        {/* FEATURES */}
        <RevealSection id="features" className="space-y-10">
          <SectionHeader
            eyebrow="Core Features"
            title="Everything needed to make the game feel alive"
            description="Not just good-looking cards — a system designed to create replayability, pressure, and believable founder storytelling."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {featureCards.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full hover:-translate-y-1 transition-transform duration-300 group">
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 inner-shadow group-hover:bg-white/10 transition-colors ${feature.color}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-liquid-textMuted leading-6">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* HOW IT WORKS */}
        <RevealSection id="how-it-works" className="space-y-10 max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="How It Works"
            title="Four steps from idea to outcome"
            description="Simple to understand, hard to survive."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-liquid-glassBorder hidden xl:block -z-10" />
            {steps.map((step) => (
              <GlassCard key={step.step} className="p-6 text-center space-y-4">
                <span className="text-4xl font-black text-liquid-glassBorder">
                  {step.step}
                </span>
                <h4 className="font-bold text-lg">{step.title}</h4>
                <p className="text-sm text-liquid-textMuted leading-6">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* DEMO + EXPERIENCE */}
        <RevealSection id="demo" className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <SectionHeader
              eyebrow="Gameplay Preview"
              title="Experience real founder anxiety"
              description="Feel cash pressure, face product uncertainty, and make uncomfortable decisions while the market keeps moving."
              center={false}
            />

            <div className="space-y-4">
              {[
                "Feel the pressure of running out of money.",
                "Navigate co-founder and team conflicts.",
                "Manage growth spikes without collapsing under cost and chaos.",
              ].map((item, idx) => (
                <div key={item} className="flex items-start gap-4 text-sm sm:text-lg">
                  <div
                    className={`mt-2 w-2.5 h-2.5 rounded-full ${idx === 0
                      ? "bg-liquid-accent1 shadow-[0_0_10px_#ff2a5f]"
                      : idx === 1
                        ? "bg-yellow-400 shadow-[0_0_10px_#facc15]"
                        : "bg-liquid-accent2 shadow-[0_0_10px_#00f7ff]"
                      }`}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button onClick={onStart} className="btn-outline-glass text-sm">
              Play a round
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 20 }}
            whileInView={{ opacity: 1, rotate: 1.5, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="glass-panel p-2 shadow-glass-glow md:rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <div className="bg-liquid-dark rounded-xl p-4 border border-liquid-glassBorder min-h-[300px] sm:min-h-[340px] flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <span className="text-xs text-liquid-textMuted">Month 3 • Crisis Event</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                    -₹5,000
                  </span>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    +15% Growth Potential
                  </span>
                </div>
              </div>

              <p className="font-medium text-sm sm:text-base leading-7 mb-6 flex-1">
                Your primary cloud provider just went down during a major launch
                campaign. Users are furious, trial signups are dropping, and your
                tiny team is already exhausted. How do you respond?
              </p>

              <div className="space-y-3">
                <div className="glass-panel p-3 sm:p-4 text-xs sm:text-sm border border-liquid-accent1/30 cursor-pointer bg-liquid-accent1/10 hover:bg-liquid-accent1/15 transition-colors">
                  Apologize publicly and issue credits
                </div>
                <div className="glass-panel p-3 sm:p-4 text-xs sm:text-sm border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                  Fix silently and avoid drawing attention
                </div>
                <div className="glass-panel p-3 sm:p-4 text-xs sm:text-sm border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                  Push your intern to handle support while engineering recovers
                </div>
              </div>
            </div>
          </motion.div>
        </RevealSection>

        {/* LIVE FEED */}
        <RevealSection className="space-y-8">
          <SectionHeader
            eyebrow="Live Simulation Feed"
            title="The founder world never sleeps"
            description="A fast-moving ecosystem where wins, mistakes, and collapses happen every minute."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveFeed.map((item, index) => (
              <GlassCard key={index} className="p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-liquid-accent2 mt-0.5 shrink-0" />
                <p className="text-sm text-liquid-textMuted leading-6">{item}</p>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* USP */}
        <RevealSection className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            eyebrow="Why It Feels Different"
            title="This is not a fixed script pretending to be a game"
            description="The simulation is shaped by your startup setup, funding source, decisions, and compounding pressure over time."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-left">
            {[
              {
                title: "Funding changes the story",
                desc: "Investor money boosts momentum but raises pressure. Loans increase stress. Bootstrapping keeps control but limits speed.",
              },
              {
                title: "AI creates personalized tension",
                desc: "The world responds to your startup idea, your choices, and your current condition instead of giving generic startup quotes.",
              },
              {
                title: "Outcomes actually branch",
                desc: "You are not heading toward one ending. You can survive, pivot, plateau, get acquired, explode, or burn.",
              },
              {
                title: "The game teaches trade-offs",
                desc: "You learn the tension between growth, cash, team bandwidth, product quality, and founder mental load.",
              },
            ].map((item) => (
              <GlassCard key={item.title} className="p-5 flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-liquid-accent2 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-liquid-textMuted mt-2 leading-6">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* TIMELINE */}
        <RevealSection className="space-y-10">
          <SectionHeader
            eyebrow="Founder Journey"
            title="From spark to scale — or collapse"
            description="A run is structured like a startup timeline, with each phase increasing pressure, complexity, and stakes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {timeline.map((item) => (
              <GlassCard key={item.label} className="p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-liquid-accent1/0 via-liquid-accent2/80 to-liquid-accent1/0" />
                <div className="text-xs uppercase tracking-[0.2em] text-liquid-accent2 mb-3">
                  {item.label}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-liquid-textMuted leading-6">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* AI ENGINE */}
        <RevealSection className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="AI Engine"
              title="How the simulation thinks"
              description="The app combines a deterministic game engine with AI-generated narrative context, so the world feels dynamic without breaking logic."
              center={false}
            />

            <div className="space-y-4">
              {[
                "You define the startup idea, capital, and funding source.",
                "The game engine tracks money, growth, stress, and outcomes.",
                "AI generates startup-specific scenarios and narrative flavor.",
                "Your decisions update state and shape future challenges.",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-liquid-accent2 mt-0.5 shrink-0" />
                  <p className="text-sm sm:text-base text-liquid-textMuted leading-6">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <GlassCard className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Your Input", subtitle: "Idea • Money • Funding Source" },
                { title: "Simulation Engine", subtitle: "Rules • State • Progression" },
                { title: "AI Scenario Layer", subtitle: "Context • Tone • Options" },
                { title: "Outcome", subtitle: "Growth • Failure • Survival • Exit" },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-sm font-semibold">{item.title}</div>
                  <div className="text-xs text-liquid-textMuted mt-1">{item.subtitle}</div>
                  {index < 3 && (
                    <div className="flex justify-center py-3">
                      <ChevronDown className="w-5 h-5 text-liquid-textMuted" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealSection>

        {/* MECHANICS */}
        <RevealSection id="mechanics" className="space-y-10">
          <SectionHeader
            eyebrow="Game Mechanics"
            title="The system behind the pressure"
            description="Every meaningful decision affects one or more core stats that decide whether you scale, stall, or collapse."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {mechanics.map((item) => (
              <GlassCard key={item.title} className="p-6">
                <item.icon className="w-7 h-7 text-liquid-accent2 mb-4" />
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-liquid-textMuted leading-6">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* SCENARIOS */}
        <RevealSection className="space-y-8">
          <SectionHeader
            eyebrow="Scenario Preview"
            title="Typical days inside a fragile startup"
            description="A sample of the kinds of situations your startup may face during a run."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {scenarioCards.map((item, index) => (
              <GlassCard
                key={item.title}
                className={`p-6 border-t-2 ${item.border} group relative overflow-hidden hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-5 ${item.iconColor}`}
                  >
                    <item.icon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-liquid-textMuted">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="text-sm text-liquid-textMuted leading-6">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* DIFFICULTY MODES */}
        <RevealSection className="space-y-8">
          <SectionHeader
            eyebrow="Difficulty Modes"
            title="Choose how brutal the market should feel"
            description="Let new players learn the system, or throw experienced players into startup hell."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Easy",
                desc: "More forgiving cash flow, lighter stress spikes, and gentler setbacks.",
                tone: "border-green-500/30",
                icon: Shield,
                color: "text-green-400",
              },
              {
                title: "Realistic",
                desc: "Balanced mode for believable founder pressure and meaningful trade-offs.",
                tone: "border-cyan-500/30",
                icon: Gauge,
                color: "text-cyan-400",
              },
              {
                title: "Brutal",
                desc: "Short runway, harsher events, and almost no room for lazy decisions.",
                tone: "border-red-500/30",
                icon: AlertTriangle,
                color: "text-red-400",
              },
            ].map((mode) => (
              <GlassCard key={mode.title} className={`p-6 border ${mode.tone}`}>
                <mode.icon className={`w-7 h-7 ${mode.color} mb-4`} />
                <h4 className="text-xl font-bold">{mode.title}</h4>
                <p className="text-sm text-liquid-textMuted mt-2 leading-6">
                  {mode.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </RevealSection>

        {/* LEADERBOARD + TESTIMONIALS */}
        <RevealSection className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Leaderboard Preview"
              title="Some founders survive better than others"
              description="A competitive layer that makes replaying the simulation even more addictive."
              center={false}
            />

            <GlassCard className="p-5">
              <div className="space-y-3">
                {founders.map((founder) => (
                  <div
                    key={founder.rank}
                    className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-bold text-liquid-accent2">
                        {founder.rank}
                      </div>
                      <div>
                        <div className="font-medium">{founder.name}</div>
                        <div className={`text-xs ${founder.tone}`}>{founder.result}</div>
                      </div>
                    </div>
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <SectionHeader
              eyebrow="What Players Feel"
              title="Built to create tension, not just clicks"
              description="The strongest reactions come when players begin treating the simulation like a real company."
              center={false}
            />

            <GlassCard className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Star className="w-20 h-20" />
              </div>

              <div className="space-y-4 relative z-10">
                {testimonials.map((item) => (
                  <div
                    key={item.author}
                    className="bg-white/5 p-5 rounded-2xl border border-white/5"
                  >
                    <p className="text-sm italic leading-6">"{item.text}"</p>
                    <div className="text-xs font-bold text-liquid-accent2 mt-3">
                      — {item.author}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </RevealSection>

        {/* FOUNDER PERSONALITY */}
        <RevealSection className="text-center space-y-8 max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Founder Archetypes"
            title="What kind of founder are you?"
            description="The simulation doesn’t just measure survival. It reflects how you behaved under pressure."
          />

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Risk Taker",
              "Smart Builder",
              "Chaotic Founder",
              "Growth Hacker",
              "Disciplined Operator",
              "Burnout Visionary",
            ].map((label, idx) => (
              <span
                key={label}
                className={`glass-panel px-4 py-2 text-sm ${idx === 0
                  ? "text-red-300 border-red-500/30"
                  : idx === 1
                    ? "text-blue-300 border-blue-500/30"
                    : idx === 2
                      ? "text-yellow-300 border-yellow-500/30"
                      : idx === 3
                        ? "text-green-300 border-green-500/30"
                        : idx === 4
                          ? "text-cyan-300 border-cyan-500/30"
                          : "text-pink-300 border-pink-500/30"
                  }`}
              >
                {label}
              </span>
            ))}
          </div>
        </RevealSection>

        {/* METRICS + COMPARISON */}
        <RevealSection className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="By The Numbers"
              title="Designed for replay and retention"
              description="The product is structured to reward experimentation and create different stories across runs."
              center={false}
            />

            <div className="grid grid-cols-2 gap-4">
              {[
                ["1k+", "Simulations"],
                ["50+", "Unique Endings"],
                ["6+", "Founder Types"],
                ["3", "Difficulty Modes"],
              ].map(([value, label], i) => (
                <GlassCard key={i} className="p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-liquid-accent2">
                    {value}
                  </div>
                  <div className="text-xs text-liquid-textMuted uppercase tracking-wider mt-1">
                    {label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeader
              eyebrow="Why This Works"
              title="Traditional startup learning vs interactive simulation"
              description="Passive content informs. Simulation trains instincts."
              center={false}
            />

            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[520px]">
                  <thead className="bg-white/5 text-liquid-textMuted uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Traditional Learning</th>
                      <th className="px-6 py-3 text-white">FoundrX</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {comparisonRows.map(([left, right]) => (
                      <tr key={left}>
                        <td className="px-6 py-3">{left}</td>
                        <td className="px-6 py-3 font-medium text-liquid-accent2">
                          {right}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </RevealSection>

        {/* FAQ */}
        <RevealSection id="faq" className="max-w-4xl mx-auto space-y-6">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions founders usually ask before they begin"
            description="A few quick answers before you throw yourself into the market."
          />

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;

              return (
                <GlassCard
                  key={faq.q}
                  className="p-0 border-transparent hover:border-liquid-glassBorder transition-colors overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full text-left px-5 sm:px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-liquid-textMuted transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 text-sm text-liquid-textMuted leading-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              );
            })}
          </div>
        </RevealSection>

        {/* FINAL CTA */}
        <RevealSection className="text-center py-12 sm:py-16 md:py-20 px-5 sm:px-6 glass-panel border-liquid-accent1/30 shadow-glass-glow bg-gradient-to-b from-transparent to-liquid-accent1/5">
          <SectionHeader
            eyebrow="Final Call"
            title="Ready to build your startup?"
            description="The market will not slow down for you. Claim your capital, enter the simulation, and find out whether your founder instincts create momentum or disaster."
          />

          <div className="pt-4">
            <button onClick={onStart} className="btn-liquid transform md:scale-105">
              Start Simulation Now
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-liquid-textMuted">
            <Clock3 className="w-4 h-4" />
            Average run time: 5–15 minutes
          </div>
        </RevealSection>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 sm:mt-24 md:mt-32 max-w-7xl mx-auto px-4 sm:px-6 py-8 border-t border-liquid-glassBorder flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-sm text-liquid-textMuted">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-liquid-accent1 to-liquid-accent2 flex items-center justify-center font-bold text-white text-xs">
            B
          </div>
          <div>
            <span className="font-bold text-white">FoundrX</span>
            <p className="text-xs text-liquid-textMuted">© 2026 AI Startup Simulator</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-white transition-colins">
            GitHub
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Credits
          </a>
        </div>
      </footer>

      {/* MOBILE STICKY CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
        <div className="glass-panel p-2 border border-white/10 bg-liquid-dark/75 backdrop-blur-xl">
          <button
            onClick={onStart}
            className="btn-liquid w-full flex items-center justify-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Start Simulation
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;