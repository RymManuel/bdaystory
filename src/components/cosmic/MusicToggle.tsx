import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MUSIC_URL =
  'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=cinematic-atmosphere-score-2-22136.mp3';

const MusicToggle: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur-md transition-all hover:border-purple-400/50 hover:bg-white/10 hover:text-white"
    >
      {playing ? <Volume2 className="h-4 w-4 text-purple-300" /> : <VolumeX className="h-4 w-4" />}
      <span className="hidden sm:inline">{playing ? 'Sound On' : 'Sound Off'}</span>
      {playing && (
        <span className="flex items-end gap-[2px] h-3">
          <span className="w-[2px] bg-purple-300 animate-eq1" />
          <span className="w-[2px] bg-blue-300 animate-eq2" />
          <span className="w-[2px] bg-purple-300 animate-eq3" />
        </span>
      )}
    </button>
  );
};

export default MusicToggle;
