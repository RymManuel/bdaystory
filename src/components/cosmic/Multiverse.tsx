import React, { useEffect, useState } from 'react';

interface World {
  name: string;
  gradient: string;
  accent: string;
}

const worlds: World[] = [
  { name: 'Cyberpunk City', gradient: 'from-fuchsia-900 via-purple-900 to-cyan-900', accent: 'shadow-[inset_0_0_120px_rgba(217,70,239,0.5)]' },
  { name: 'Fantasy Kingdom', gradient: 'from-emerald-900 via-teal-900 to-indigo-950', accent: 'shadow-[inset_0_0_120px_rgba(16,185,129,0.4)]' },
  { name: 'Tropical Paradise', gradient: 'from-amber-700 via-rose-700 to-sky-800', accent: 'shadow-[inset_0_0_120px_rgba(251,191,36,0.4)]' },
  { name: 'Deep Space Galaxy', gradient: 'from-indigo-950 via-purple-950 to-black', accent: 'shadow-[inset_0_0_120px_rgba(99,102,241,0.5)]' },
  { name: 'Futuristic Earth', gradient: 'from-sky-900 via-blue-950 to-slate-900', accent: 'shadow-[inset_0_0_120px_rgba(56,189,248,0.4)]' },
];

const captions = ['In some universes...', 'We never met.', 'In others...', 'We met too late.'];

const Multiverse: React.FC<{ active: boolean }> = ({ active }) => {
  const [idx, setIdx] = useState(0);
  const [cap, setCap] = useState(0);

  useEffect(() => {
    if (!active) return;
    const w = setInterval(() => setIdx((i) => (i + 1) % worlds.length), 1500);
    const c = setInterval(() => setCap((i) => (i + 1) % captions.length), 2600);
    return () => {
      clearInterval(w);
      clearInterval(c);
    };
  }, [active]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {worlds.map((world, i) => (
        <div
          key={world.name}
          className={`absolute inset-0 bg-gradient-to-br ${world.gradient} ${world.accent} transition-all duration-700`}
          style={{
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'scale(1.05)' : 'scale(1.25)',
            filter: i === idx ? 'blur(0px)' : 'blur(10px)',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent_60%)]" />
          {/* light streaks */}
          <div className="absolute left-1/4 top-0 h-full w-px bg-white/20 blur-sm animate-streak" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-white/10 blur-sm animate-streak" style={{ animationDelay: '0.6s' }} />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/70">
            {world.name}
          </div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h2
          key={cap}
          className="text-center font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white animate-caption-pop drop-shadow-[0_0_25px_rgba(0,0,0,0.8)]"
        >
          {captions[cap]}
        </h2>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
    </div>
  );
};

export default Multiverse;
