import React, { useRef, useEffect } from 'react';

interface StarfieldProps {
  density?: number;
  speed?: number;
  zoom?: boolean;
  className?: string;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}

const Starfield: React.FC<StarfieldProps> = ({ density = 1, speed = 0.6, zoom = true, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const count = Math.floor((isMobile ? 180 : 380) * density);
    const stars: Star[] = [];
    const colors = ['#ffffff', '#c4b5fd', '#93c5fd', '#a5b4fc', '#ddd6fe'];

    const reset = (s: Star) => {
      s.x = (Math.random() - 0.5) * w;
      s.y = (Math.random() - 0.5) * h;
      s.z = Math.random() * w;
      s.pz = s.z;
    };

    for (let i = 0; i < count; i++) {
      const s = { x: 0, y: 0, z: 0, pz: 0 };
      reset(s);
      stars.push(s);
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);

      const sp = zoom ? speed * 6 : speed * 1.5;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z -= sp;
        if (s.z < 1) {
          reset(s);
          s.z = w;
          s.pz = w;
        }
        const sx = (s.x / s.z) * w;
        const sy = (s.y / s.z) * w;
        const px = (s.x / s.pz) * w;
        const py = (s.y / s.pz) * w;
        const size = (1 - s.z / w) * 2.2;
        const c = colors[i % colors.length];
        ctx.strokeStyle = c;
        ctx.lineWidth = Math.max(0.3, size);
        ctx.globalAlpha = Math.min(1, (1 - s.z / w) * 1.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [density, speed, zoom]);

  return <canvas ref={canvasRef} className={className ?? 'fixed inset-0 w-full h-full'} />;
};

export default Starfield;
