import React, { useEffect, useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import LoadingScreen from './LoadingScreen';
import Starfield from './Starfield';
import TypewriterText from './TypewriterText';
import Multiverse from './Multiverse';
import HeartConverge from './HeartConverge';
import Confetti from './Confetti';
import LetterModal from './LetterModal';
import CursorTrail from './CursorTrail';
import PhotoFrame from './PhotoFrame';

const PHOTO_REVEAL_DELAY_MS = 2200;


type Scene = 'loading' | 'scene1' | 'scene2' | 'scene3' | 'scene4';

const CinematicExperience: React.FC = () => {
  const [scene, setScene] = useState<Scene>('loading');
  const [scene1Done, setScene1Done] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [reveal4, setReveal4] = useState(0);

  // Scene 1 -> 2 after typewriter completes
  useEffect(() => {
    if (scene === 'scene1' && scene1Done) {
      const t = setTimeout(() => setScene('scene2'), 2600);
      return () => clearTimeout(t);
    }
  }, [scene, scene1Done]);

  // Scene 2 -> 3
  useEffect(() => {
    if (scene === 'scene2') {
      const t = setTimeout(() => setScene('scene3'), 30000);
      return () => clearTimeout(t);
    }
  }, [scene]);

  // Scene 3 -> 4
  useEffect(() => {
    if (scene === 'scene3') {
      const t = setTimeout(() => setScene('scene4'), 7500);
      return () => clearTimeout(t);
    }
  }, [scene]);

  // Scene 4 staged reveal
  useEffect(() => {
    if (scene === 'scene4') {
      const timers = [
        setTimeout(() => setReveal4(1), PHOTO_REVEAL_DELAY_MS),
        setTimeout(() => setReveal4(2), 4200),
        setTimeout(() => setReveal4(3), 6000),
        setTimeout(() => setReveal4(4), 7800),
      ];
      return () => timers.forEach(clearTimeout);
    }

    setReveal4(0);
  }, [scene]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white font-sans">
      <CursorTrail />

      {/* LOADING */}
      {scene === 'loading' && <LoadingScreen onComplete={() => setScene('scene1')} />}

      {/* SCENE 1 — THE UNIVERSE */}
      {scene === 'scene1' && (
        <section className="absolute inset-0 animate-fade-in">
          <Starfield zoom speed={0.5} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-blue-950/30" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <TypewriterText
              lines={[
                'Scientists say there may be infinite universes.',
                'Different timelines.',
                'Different choices.',
                'Different versions of us.',
              ]}
              className="space-y-4 max-w-2xl"
              lineClassName="font-serif text-2xl sm:text-4xl md:text-5xl font-light leading-snug text-white drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
              onComplete={() => setScene1Done(true)}
            />
          </div>
        </section>
      )}

      {/* SCENE 2 — THE MULTIVERSE */}
      {scene === 'scene2' && (
        <section className="absolute inset-0 animate-fade-in">
          <Multiverse active />
        </section>
      )}

      {/* SCENE 3 — THE SEARCH */}
      {scene === 'scene3' && (
        <section className="absolute inset-0 animate-fade-in bg-black">
          <Starfield zoom={false} speed={0.2} density={0.6} />
          <HeartConverge active />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="space-y-5 max-w-2xl">
              <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-white animate-fade-in-slow drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]">
                But if infinite universes truly exist...
              </p>
              <p
                className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-fuchsia-200 via-white to-purple-200 bg-clip-text text-transparent animate-fade-in-slow drop-shadow-[0_0_30px_rgba(240,171,252,0.7)]"
                style={{ animationDelay: '2.4s', opacity: 0, animationFillMode: 'forwards' }}
              >
                I'd tear through every single one.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SCENE 4 — THE REVEAL */}
      {scene === 'scene4' && (
        <section className="absolute inset-0 overflow-y-auto bg-black">
          <Starfield zoom={false} speed={0.15} density={0.5} />
          <Confetti active={reveal4 >= 3} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black/40 to-blue-950/40" />

          <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
            <p className="font-serif text-2xl sm:text-4xl font-light text-white animate-fade-in-slow drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              Until I found my favorite universe.
            </p>

            {/* Photo frame */}
            <PhotoFrame visible={reveal4 >= 1} />


            <div
              className="mt-10 space-y-2 transition-all duration-1000"
              style={{ opacity: reveal4 >= 2 ? 1 : 0 }}
            >
              <p className="font-serif text-xl sm:text-3xl font-light text-white">And in every universe...</p>
              <p className="font-serif text-2xl sm:text-4xl font-light bg-gradient-to-r from-fuchsia-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(240,171,252,0.6)]">
                I'd still choose you, my baby.
              </p>
            </div>

            <h1
              className="mt-10 flex items-center justify-center gap-3 font-serif text-3xl sm:text-5xl md:text-6xl font-semibold transition-all duration-1000"
              style={{ opacity: reveal4 >= 3 ? 1 : 0, transform: reveal4 >= 3 ? 'scale(1)' : 'scale(0.8)' }}
            >
              <Heart className="h-7 w-7 sm:h-10 sm:w-10 text-fuchsia-500 fill-fuchsia-500 animate-heartbeat" />
              <span className="bg-gradient-to-r from-fuchsia-300 via-purple-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(240,171,252,0.5)]">
                Happy Birthday, My Baby
              </span>
              <Heart className="h-7 w-7 sm:h-10 sm:w-10 text-fuchsia-500 fill-fuchsia-500 animate-heartbeat" />
            </h1>

            <button
              onClick={() => setLetterOpen(true)}
              className="mt-12 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/50 bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 px-8 py-3.5 text-sm uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_45px_rgba(217,70,239,0.7)]"
              style={{ opacity: reveal4 >= 4 ? 1 : 0 }}
            >
              <Heart className="h-4 w-4 text-fuchsia-300" />
              Open Birthday Letter
              <ChevronRight className="h-4 w-4" />
            </button>

            <p
              className="mt-10 text-xs uppercase tracking-[0.3em] text-white/30 transition-opacity duration-1000"
              style={{ opacity: reveal4 >= 4 ? 1 : 0 }}
            >
              If Infinite Universes Exist...
            </p>
          </div>
        </section>
      )}

      {/* Skip control */}
      {scene !== 'loading' && scene !== 'scene4' && (
        <button
          onClick={() => setScene('scene4')}
          className="fixed bottom-5 right-5 z-50 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/50 backdrop-blur-md transition hover:text-white"
        >
          Skip →
        </button>
      )}

      <LetterModal open={letterOpen} onClose={() => setLetterOpen(false)} />
    </div>
  );
};

export default CinematicExperience;
