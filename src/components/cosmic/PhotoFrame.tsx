import React from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULT_PHOTO = '/images/her-photo.png';

const PhotoFrame: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div
      className="mt-10 transition-all duration-1000"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.85)' }}
    >
      <div className="relative animate-float">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-fuchsia-500/50 via-purple-500/50 to-rose-500/50 blur-2xl animate-pulse" />
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-400/30 via-white/10 to-purple-400/30" />

        <div className="relative h-72 w-60 sm:h-96 sm:w-80 overflow-hidden rounded-2xl border-2 border-white/30 bg-gradient-to-br from-purple-900/50 to-rose-900/50 shadow-[0_0_60px_rgba(240,171,252,0.6)] backdrop-blur-sm">
          <img
            src={DEFAULT_PHOTO}
            alt="My baby — my favorite universe"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-fuchsia-500/10" />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
            <Sparkles className="h-3 w-3 text-fuchsia-300" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/80">My Favorite Universe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoFrame;
