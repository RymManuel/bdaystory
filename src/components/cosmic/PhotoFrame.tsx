import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Camera, Link as LinkIcon, Upload, X, Pencil } from 'lucide-react';

const STORAGE_KEY = 'cinematic-birthday-photo';

const PhotoFrame: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPhoto(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (value: string | null) => {
    setPhoto(value);
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be full for large images */
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image is too large (max 5MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      persist(reader.result as string);
      setEditing(false);
      setError('');
    };
    reader.onerror = () => setError('Could not read that file.');
    reader.readAsDataURL(file);
  };

  const handleUrl = () => {
    const v = urlInput.trim();
    if (!v) {
      setError('Paste an image link first.');
      return;
    }
    persist(v);
    setUrlInput('');
    setEditing(false);
    setError('');
  };

  return (
    <div
      className="mt-10 transition-all duration-1000"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.85)' }}
    >
      <div className="relative animate-float">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-fuchsia-500/40 via-purple-500/40 to-blue-500/40 blur-2xl animate-pulse" />

        <div className="group relative h-64 w-56 sm:h-80 sm:w-72 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-purple-900/50 to-blue-900/50 shadow-[0_0_50px_rgba(139,92,246,0.5)] backdrop-blur-sm">
          {photo ? (
            <>
              <img
                src={photo}
                alt="My favorite universe"
                className="h-full w-full object-cover"
                onError={() => setError('That image could not load.')}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <button
                onClick={() => setEditing(true)}
                aria-label="Change photo"
                className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/50 p-2 text-white/80 opacity-0 backdrop-blur-md transition group-hover:opacity-100 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center transition hover:bg-white/5"
            >
              <Sparkles className="h-8 w-8 text-purple-300/70" />
              <p className="text-sm uppercase tracking-widest text-white/50">
                Add Her Photo
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-3 py-1.5 text-[11px] uppercase tracking-wider text-fuchsia-200">
                <Camera className="h-3.5 w-3.5" /> Tap to upload
              </span>
            </button>
          )}

          {/* Editor overlay */}
          {editing && (
            <div className="absolute inset-0 z-10 flex flex-col gap-3 bg-black/85 p-4 backdrop-blur-md animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-white/70">Choose a photo</span>
                <button
                  onClick={() => {
                    setEditing(false);
                    setError('');
                  }}
                  aria-label="Cancel"
                  className="rounded-full p-1 text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/15 py-2.5 text-xs uppercase tracking-wider text-purple-100 transition hover:bg-purple-500/30"
              >
                <Upload className="h-4 w-4" /> Upload from device
              </button>

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
                <span className="h-px flex-1 bg-white/15" /> or <span className="h-px flex-1 bg-white/15" />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-2">
                <LinkIcon className="h-4 w-4 shrink-0 text-white/40" />
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrl()}
                  placeholder="Paste image URL"
                  className="w-full bg-transparent py-2 text-xs text-white placeholder:text-white/30 focus:outline-none"
                />
              </div>
              <button
                onClick={handleUrl}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 py-2 text-xs uppercase tracking-wider text-white transition hover:opacity-90"
              >
                Use this link
              </button>

              {photo && (
                <button
                  onClick={() => {
                    persist(null);
                    setEditing(false);
                  }}
                  className="text-[11px] uppercase tracking-widest text-white/40 transition hover:text-rose-300"
                >
                  Remove photo
                </button>
              )}

              {error && <p className="text-center text-[11px] text-rose-300">{error}</p>}
            </div>
          )}
        </div>
      </div>

      {!editing && error && (
        <p className="mt-3 text-center text-[11px] text-rose-300">{error}</p>
      )}
    </div>
  );
};

export default PhotoFrame;
