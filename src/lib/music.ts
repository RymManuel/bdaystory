const MUSIC_URL = '/audio/kalapastangan.webm';

let audio: HTMLAudioElement | null = null;

export function getMusic(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.55;
  }
  return audio;
}

export async function playMusic(): Promise<boolean> {
  try {
    await getMusic().play();
    return true;
  } catch {
    return false;
  }
}

export function pauseMusic(): void {
  audio?.pause();
}

export function isMusicPlaying(): boolean {
  return Boolean(audio && !audio.paused);
}
