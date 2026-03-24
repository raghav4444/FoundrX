import { useState, useEffect } from 'react';
import { Loader2, Quote } from 'lucide-react';

const QUOTES = [
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Move fast and break things. Unless you are breaking things, you are not moving fast enough.", author: "Mark Zuckerberg" },
  { text: "It’s not about ideas. It’s about making ideas happen.", author: "Scott Belsky" },
  { text: "If you’re not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
  { text: "The only thing worse than starting something and failing… is not starting something.", author: "Seth Godin" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The secret to successful hiring is this: look for the people who want to change the world.", author: "Marc Benioff" }
];

export default function LoadingOverlay() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-liquid-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-liquid-accent2/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <Loader2 className="w-16 h-16 text-liquid-accent2 animate-spin mx-auto mb-12 shadow-[0_0_30px_rgba(0,247,255,0.3)] rounded-full" />
        
        <div className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-center mb-6">
            <Quote className="w-10 h-10 text-liquid-accent1/40" />
          </div>
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 leading-tight">
            "{QUOTES[quoteIndex].text}"
          </h2>
          <p className="text-liquid-accent2 font-bold tracking-widest uppercase text-sm">
            — {QUOTES[quoteIndex].author}
          </p>
        </div>
        
        <div className="mt-16 flex flex-col items-center gap-2">
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-liquid-accent1 to-liquid-accent2 animate-loading-bar" style={{ width: '40%' }} />
          </div>
          <p className="text-gray-500 text-xs mt-2 animate-pulse tracking-widest uppercase">
            AI is architecting your startup universe...
          </p>
        </div>
      </div>
    </div>
  );
}
