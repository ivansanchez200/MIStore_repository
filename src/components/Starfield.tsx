import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.85 ? 1 : 2,
      opacity: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 4,
    });
  }
  return stars;
}

export function Starfield({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => generateStars(count), [count]);

  return (
    <div className="starfield pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        .starfield .star {
          position: absolute;
          border-radius: 9999px;
          background: #ffffff;
        }
        @keyframes twinkle {
          0%, 100% { opacity: var(--star-opacity, 0.4); transform: scale(1); }
          50% { opacity: 0.1; transform: scale(0.6); }
        }
      `}</style>
    </div>
  );
}
