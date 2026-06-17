import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  startDelay?: number;
  className?: string;
  lineClassName?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  speed = 55,
  lineDelay = 700,
  startDelay = 300,
  className = '',
  lineClassName = '',
  onComplete,
}) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIdx, setLineIdx] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const typeLine = (idx: number) => {
      if (cancelled) return;
      if (idx >= lines.length) {
        onComplete?.();
        return;
      }
      setLineIdx(idx);
      const text = lines[idx];
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i++;
        setCurrentLine(text.slice(0, i));
        if (i < text.length) {
          timers.push(setTimeout(tick, speed));
        } else {
          setDisplayed((prev) => [...prev, text]);
          setCurrentLine('');
          timers.push(setTimeout(() => typeLine(idx + 1), lineDelay));
        }
      };
      tick();
    };

    timers.push(setTimeout(() => typeLine(0), startDelay));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      {displayed.map((line, i) => (
        <p key={i} className={`${lineClassName} animate-fade-in`}>
          {line}
        </p>
      ))}
      {currentLine && lineIdx < lines.length && (
        <p className={lineClassName}>
          {currentLine}
          <span className="inline-block w-[2px] h-[1em] bg-purple-300 ml-1 align-middle animate-pulse" />
        </p>
      )}
    </div>
  );
};

export default TypewriterText;
