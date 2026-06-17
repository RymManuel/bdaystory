import React, { useEffect, useState } from 'react';

interface World {
  name: string;
  gradient: string;
  accent: string;
  glow: string;
}

const worlds: World[] = [
  {
    name: 'Cyberpunk City',
    gradient: 'from-fuchsia-900 via-purple-900 to-cyan-900',
    accent: 'shadow-[inset_0_0_120px_rgba(217,70,239,0.5)]',
    glow: 'rgba(217,70,239,0.6)',
  },
  {
    name: 'Fantasy Kingdom',
    gradient: 'from-emerald-900 via-teal-900 to-indigo-950',
    accent: 'shadow-[inset_0_0_120px_rgba(16,185,129,0.4)]',
    glow: 'rgba(16,185,129,0.5)',
  },
  {
    name: 'Tropical Paradise',
    gradient: 'from-amber-700 via-rose-700 to-sky-800',
    accent: 'shadow-[inset_0_0_120px_rgba(251,191,36,0.4)]',
    glow: 'rgba(251,191,36,0.5)',
  },
  {
    name: 'Deep Space Galaxy',
    gradient: 'from-indigo-950 via-purple-950 to-black',
    accent: 'shadow-[inset_0_0_120px_rgba(99,102,241,0.5)]',
    glow: 'rgba(99,102,241,0.6)',
  },
  {
    name: 'Futuristic Earth',
    gradient: 'from-sky-900 via-blue-950 to-slate-900',
    accent: 'shadow-[inset_0_0_120px_rgba(56,189,248,0.4)]',
    glow: 'rgba(56,189,248,0.5)',
  },
];

const captions = [
  { line: 'We never met.', echo: 'A thousand timelines. Zero us.' },
  { line: 'We met too late.', echo: 'When fate moved too slow.' },
  { line: 'We almost missed each other.', echo: 'By a single breath.' },
  { line: "But I'd still find you.", echo: 'In every universe. Every time.' },
];

const Multiverse: React.FC<{ active: boolean }> = ({ active }) => {
  const [idx, setIdx] = useState(0);
  const [cap, setCap] = useState(0);
  const [flash, setFlash] = useState(false);
  const [showEcho, setShowEcho] = useState(false);

  useEffect(() => {
    if (!active) return;
    const w = setInterval(() => {
      setFlash(true);
      setIdx((i) => (i + 1) % worlds.length);
      setTimeout(() => setFlash(false), 180);
    }, 1800);
    const c = setInterval(() => {
      setShowEcho(false);
      setCap((i) => (i + 1) % captions.length);
    }, 7000);
    return () => {
      clearInterval(w);
      clearInterval(c);
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    setShowEcho(false);
    const t = setTimeout(() => setShowEcho(true), 650);
    return () => clearTimeout(t);
  }, [active, cap]);

  const world = worlds[idx];
  const caption = captions[cap];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Portal rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-white/20 animate-portal-ring"
            style={{
              width: `${38 + ring * 22}vmin`,
              height: `${38 + ring * 22}vmin`,
              animationDelay: `${ring * 0.7}s`,
              boxShadow: `0 0 40px ${world.glow}`,
            }}
          />
        ))}
      </div>

      {worlds.map((w, i) => (
        <div
          key={w.name}
          className={`absolute inset-0 bg-gradient-to-br ${w.gradient} ${w.accent} transition-all duration-500 ease-out`}
          style={{
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'scale(1.08) rotate(0deg)' : 'scale(1.35) rotate(2deg)',
            filter: i === idx ? 'blur(0px) brightness(1.1)' : 'blur(14px) brightness(0.6)',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(255,255,255,0.06),transparent)] animate-spin-slow" />
          <div className="absolute left-1/4 top-0 h-full w-px bg-white/25 blur-sm animate-streak" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-white/15 blur-sm animate-streak" style={{ animationDelay: '0.4s' }} />
          <div className="absolute right-1/5 top-0 h-full w-px bg-fuchsia-300/20 blur-sm animate-streak" style={{ animationDelay: '0.9s' }} />

          {/* Floating particles */}
          {Array.from({ length: 24 }).map((_, p) => (
            <span
              key={p}
              className="absolute rounded-full bg-white animate-float-particle"
              style={{
                top: `${(p * 17) % 100}%`,
                left: `${(p * 29) % 100}%`,
                width: `${2 + (p % 3)}px`,
                height: `${2 + (p % 3)}px`,
                opacity: 0.15 + (p % 5) * 0.1,
                animationDelay: `${(p % 8) * 0.35}s`,
                animationDuration: `${3 + (p % 4)}s`,
              }}
            />
          ))}

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs uppercase tracking-[0.5em] text-white/80 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
            {w.name}
          </div>
        </div>
      ))}

      {/* Flash on world shift */}
      <div
        className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-150"
        style={{ opacity: flash ? 0.18 : 0 }}
      />

      {/* Caption */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div key={cap} className="relative max-w-4xl text-center">
          <div
            className="pointer-events-none absolute -inset-x-12 -inset-y-8 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${world.glow}, transparent 70%)` }}
          />
          <h2 className="relative font-serif text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight animate-text-impact">
            <span className="bg-gradient-to-r from-white via-fuchsia-100 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(240,171,252,0.8)]">
              {caption.line}
            </span>
          </h2>
          <p
            className="relative mt-5 font-serif text-xl sm:text-3xl md:text-4xl font-light tracking-wide text-fuchsia-200/90 transition-all duration-700"
            style={{
              opacity: showEcho ? 1 : 0,
              transform: showEcho ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
              textShadow: '0 0 30px rgba(240,171,252,0.5)',
            }}
          >
            {caption.echo}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
    </div>
  );
};

export default Multiverse;
