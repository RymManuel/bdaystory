import React, { useEffect } from 'react';
import { X, Heart } from 'lucide-react';

interface LetterModalProps {
  open: boolean;
  onClose: () => void;
}

const LetterModal: React.FC<LetterModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg animate-modal-in">
        <div className="relative rounded-2xl border border-purple-400/30 bg-gradient-to-b from-purple-950/60 via-black/80 to-blue-950/60 p-6 sm:p-9 shadow-[0_0_60px_rgba(139,92,246,0.35)] backdrop-blur-xl">
          <button
            onClick={onClose}
            aria-label="Close letter"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-5 flex items-center gap-3">
            <Heart className="h-5 w-5 text-fuchsia-400 fill-fuchsia-400/60" />
            <h3 className="font-serif text-xl sm:text-2xl text-white">A Letter Across Universes</h3>
          </div>

          <div className="max-h-[55vh] overflow-y-auto pr-2 text-white/80 leading-relaxed letter-scroll">
            <p className="font-serif text-base sm:text-lg italic text-white/90">My Love,</p>
            <p className="mt-4 text-sm sm:text-base">
              [INSERT PERSONAL LETTER HERE]
            </p>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              Out of every timeline, every possibility, and every version of reality that could
              ever exist — I am grateful beyond words that this is the one where I get to know you.
            </p>
            <p className="mt-4 text-sm sm:text-base text-white/60">
              You are my favorite coincidence and my surest certainty. Across a billion billion
              worlds, my heart would always find its way back to yours.
            </p>
            <p className="mt-6 font-serif text-base sm:text-lg italic text-fuchsia-200">
              Forever yours, in this universe and all the rest.
            </p>
          </div>

          <div className="mt-7 text-center">
            <button
              onClick={onClose}
              className="rounded-full border border-purple-400/40 bg-purple-500/10 px-7 py-2.5 text-sm uppercase tracking-widest text-purple-100 transition hover:bg-purple-500/25"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterModal;
