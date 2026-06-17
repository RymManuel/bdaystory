import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { getMusic, isMusicPlaying, pauseMusic, playMusic } from '@/lib/music';

const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const sync = () => setPlaying(isMusicPlaying());
    const audio = getMusic();
    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    return () => {
      audio.removeEventListener('play', sync);
      audio.removeEventListener('pause', sync);
    };
  }, []);

  const toggle = async () => {
    if (playing) {
      pauseMusic();
      setPlaying(false);
    } else {
      const started = await playMusic();
      setPlaying(started);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-black/40 px-4 py-2.5 text-xs uppercase tracking-widest text-white/90 backdrop-blur-md transition-all hover:border-fuchsia-400/60 hover:bg-fuchsia-950/40 hover:text-white shadow-[0_0_20px_rgba(217,70,239,0.25)]"
    >
      {playing ? <Volume2 className="h-4 w-4 text-fuchsia-300" /> : <VolumeX className="h-4 w-4" />}
      <span className="hidden sm:inline">{playing ? 'Kalapastangan' : 'Play Music'}</span>
      {playing && (
        <span className="flex items-end gap-[2px] h-3">
          <span className="w-[2px] bg-fuchsia-300 animate-eq1" />
          <span className="w-[2px] bg-purple-300 animate-eq2" />
          <span className="w-[2px] bg-fuchsia-300 animate-eq3" />
        </span>
      )}
    </button>
  );
};

export default MusicToggle;
