import React, { useEffect, useState } from 'react';
import { playMusic } from '@/lib/music';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 6 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setProgress(100);
        setReady(true);
      } else {
        setProgress(p);
      }
    }, 130);
    return () => clearInterval(interval);
  }, []);

  const begin = async () => {
    await playMusic();
    onComplete();
  };

  const stars = Array.from({ length: 60 });

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black overflow-hidden">
      {stars.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random(),
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-8 h-20 w-20 rounded-full border border-purple-500/30 animate-spin-slow relative">
          <div className="absolute inset-2 rounded-full border border-blue-400/40 animate-spin-reverse" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400 shadow-[0_0_20px_8px_rgba(139,92,246,0.6)]" />
        </div>

        <h1 className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-white/90 animate-pulse">
          INITIALIZING MULTIVERSE
        </h1>
        <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.3em] text-purple-300/70">
          simulation
        </p>

        <div className="mt-10 h-[3px] w-64 sm:w-80 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400 transition-all duration-150 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 font-mono text-xs tracking-widest text-white/50">
          {Math.floor(progress)}% — calibrating timelines...
        </p>

        {ready && (
          <button
            onClick={begin}
            className="mt-10 animate-fade-in rounded-full border border-fuchsia-400/60 bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40 px-10 py-3.5 text-sm uppercase tracking-[0.25em] text-white shadow-[0_0_40px_rgba(217,70,239,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(217,70,239,0.8)]"
          >
            Enter the Multiverse
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
