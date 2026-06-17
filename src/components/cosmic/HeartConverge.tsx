import React, { useEffect, useRef } from 'react';

interface P {
  x: number;
  y: number;
  tx: number;
  ty: number;
  c: string;
}

// Parametric heart shape point
const heartPoint = (t: number, scale: number) => {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x: x * scale, y: -y * scale };
};

const HeartConverge: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const isMobile = w < 768;
    const scale = (isMobile ? 7 : 12) + 0;
    const count = isMobile ? 180 : 360;
    const colors = ['#f0abfc', '#c4b5fd', '#93c5fd', '#ffffff', '#fda4af'];

    const cx = w / 2;
    const cy = h / 2;
    const pts: P[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2;
      const hp = heartPoint(t, scale + (Math.random() - 0.5) * 1.5);
      pts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        tx: cx + hp.x,
        ty: cy + hp.y,
        c: colors[i % colors.length],
      });
    }

    const start = performance.now();
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const draw = (now: number) => {
      const prog = Math.min(1, (now - start) / 3200);
      const ease = 1 - Math.pow(1 - prog, 3);
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const x = p.x + (p.tx - p.x) * ease;
        const y = p.y + (p.ty - p.y) * ease;
        const glow = 2 + ease * 1.5;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 8 + ease * 12;
        ctx.arc(x, y, glow, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      // pulsing glow center once formed
      if (prog >= 1) {
        const pulse = 0.5 + 0.5 * Math.sin(now / 400);
        ctx.globalAlpha = 0.15 * pulse;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 14);
        g.addColorStop(0, '#f0abfc');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

export default HeartConverge;
