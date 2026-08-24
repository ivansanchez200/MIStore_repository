import { useEffect, useRef, useState, useId } from "react";

export interface ColorPreset {
  id: string;
  label: string;
  hex: string;
  glow: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: "aurora",   label: "Aurora",    hex: "#00E5FF", glow: "#00E5FF" },
  { id: "sunset",   label: "Atardecer", hex: "#FF6B4A", glow: "#FF6B4A" },
  { id: "violet",   label: "Violeta",   hex: "#B388FF", glow: "#B388FF" },
  { id: "emerald",  label: "Esmeralda", hex: "#00E676", glow: "#00E676" },
  { id: "rose",     label: "Rosa",      hex: "#FF4081", glow: "#FF4081" },
  { id: "gold",     label: "Oro",       hex: "#FFD54F", glow: "#FFD54F" },
  { id: "ice",      label: "Hielo",     hex: "#82B1FF", glow: "#82B1FF" },
  { id: "crimson",  label: "Carmesí",   hex: "#FF1744", glow: "#FF1744" },
];

const SPARKLE_COUNT = 14;

interface Sparkle {
  angle: number; distance: number; delay: number; duration: number; size: number;
}

function generateSparkles(): Sparkle[] {
  const sparkles: Sparkle[] = [];
  for (let i = 0; i < SPARKLE_COUNT; i++) {
    sparkles.push({
      angle: (i / SPARKLE_COUNT) * Math.PI * 2 + (7 % 0.5),
      distance: 120 + (i % 5) * 18,
      delay: (i % 7) * 0.04,
      duration: 0.7 + (i % 4) * 0.15,
      size: 3 + (i % 3),
    });
  }
  return sparkles;
}

export function Moon3D({ color, glow, changeId }: { color: string; glow: string; changeId: number }) {
  const filterId = useId();
  const sparklesRef = useRef<Sparkle[]>([]);
  const [bumpKey, setBumpKey] = useState(0);

  if (sparklesRef.current.length === 0) sparklesRef.current = generateSparkles();

  useEffect(() => {
    if (changeId > 0) setBumpKey((k) => k + 1);
  }, [changeId]);

  return (
    <div className="moon3d-scene">
      <div className="moon3d-halo" style={{
        background: `radial-gradient(circle, ${glow}66 0%, ${glow}22 40%, transparent 70%)`,
        transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
      }} />
      <div className="moon3d-ambient-ring" style={{
        background: `radial-gradient(circle, transparent 48%, ${glow}15 52%, ${glow}08 58%, transparent 66%)`,
        transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
      }} />

      <div key={`ripple1-${changeId}`} className="moon3d-ripple"
        style={{ borderColor: glow, animation: "moon3d-ripple-expand 1.4s cubic-bezier(0.16,1,0.3,1) forwards" }} />
      <div key={`ripple2-${changeId}`} className="moon3d-ripple moon3d-ripple-2"
        style={{ borderColor: glow, animation: "moon3d-ripple-expand 1.8s cubic-bezier(0.16,1,0.3,1) forwards" }} />

      <div className="moon3d-sparkle-container">
        {sparklesRef.current.map((sp, i) => (
          <div key={`spark-${changeId}-${i}`} className="moon3d-sparkle" style={{
            backgroundColor: glow,
            boxShadow: `0 0 8px 2px ${glow}, 0 0 16px 4px ${glow}88`,
            width: `${sp.size}px`, height: `${sp.size}px`,
            animation: `moon3d-sparkle-fly ${sp.duration}s cubic-bezier(0.22,1,0.36,1) ${sp.delay}s forwards`,
            ["--sparkle-angle" as string]: `${sp.angle}rad`,
            ["--sparkle-distance" as string]: `${sp.distance}px`,
          }} />
        ))}
      </div>

      <div className="moon3d-sphere-wrapper" key={`bump-${bumpKey}`}>
        <div className="moon3d-sphere"
          style={{ animation: bumpKey > 0 ? "moon3d-bump 0.7s cubic-bezier(0.34,1.56,0.64,1)" : undefined }}>
          <svg viewBox="0 0 300 300" className="moon3d-svg" aria-hidden="true">
            <defs>
              <filter id={`relief-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.017 0.017" numOctaves="6" seed="7" result="noise" />
                <feGaussianBlur in="noise" stdDeviation="0.5" result="smoothNoise" />
                <feDiffuseLighting in="smoothNoise" surfaceScale="7.5" diffuseConstant="1.2" lighting-color="#ffffff" result="diffuse">
                  <feDistantLight azimuth="235" elevation="55">
                    <animate attributeName="azimuth" values="180;540" dur="34s" repeatCount="indefinite" />
                  </feDistantLight>
                </feDiffuseLighting>
                <feSpecularLighting in="smoothNoise" surfaceScale="7.5" specularConstant="0.4" specularExponent="12" lighting-color="#ffffff" result="specular">
                  <feDistantLight azimuth="235" elevation="55">
                    <animate attributeName="azimuth" values="180;540" dur="34s" repeatCount="indefinite" />
                  </feDistantLight>
                </feSpecularLighting>
                <feBlend in="SourceGraphic" in2="diffuse" mode="multiply" result="shadedRock" />
                <feComposite in="specular" in2="SourceAlpha" operator="in" result="specClipped" />
                <feBlend in="shadedRock" in2="specClipped" mode="screen" result="litRock" />
                <feFlood floodColor={color} floodOpacity="0.85" result="colorFlood" />
                <feBlend in="colorFlood" in2="litRock" mode="screen" result="litColor" />
                <feComposite in="litColor" in2="SourceAlpha" operator="in" />
              </filter>
              <radialGradient id={`sphereShade-${filterId}`} cx="34%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="68%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.78" />
              </radialGradient>
              <linearGradient id={`terminator-${filterId}`} x1="15%" y1="10%" x2="95%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                <stop offset="55%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
              </linearGradient>
            </defs>
            <circle cx="150" cy="150" r="140" fill="#82786c" filter={`url(#relief-${filterId})`} />
            <circle cx="150" cy="150" r="140" fill={`url(#sphereShade-${filterId})`} style={{ mixBlendMode: "multiply" }} />
            <circle cx="150" cy="150" r="140" fill={`url(#sphereShade-${filterId})`} style={{ mixBlendMode: "screen", opacity: 0.5 }} />
            <circle cx="150" cy="150" r="140" fill={`url(#terminator-${filterId})`} style={{ mixBlendMode: "multiply" }} />
          </svg>

          <div className="moon3d-specular" style={{
            background: `radial-gradient(circle, ${color}88 0%, ${color}22 40%, transparent 70%)`,
            transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <div className="moon3d-rim" style={{
            boxShadow: `inset 0 0 0 1px ${color}22, 0 0 40px ${glow}33`,
            transition: "box-shadow 1.2s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <div className="moon3d-volume" style={{
            boxShadow: `inset 0 0 50px 16px ${color}11`,
            transition: "box-shadow 1.2s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <div className="moon3d-inner-glow" style={{
            background: `radial-gradient(circle at 50% 50%, ${color}44 0%, transparent 50%)`,
            transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <div key={`flash-${changeId}`} className="moon3d-bloom-flash" style={{
            background: `radial-gradient(circle, ${glow}cc 0%, ${glow}44 30%, transparent 60%)`,
            animation: "moon3d-bloom 0.9s ease-out forwards",
          }} />
        </div>
      </div>

      <div className="moon3d-cast-shadow" style={{
        background: `radial-gradient(ellipse, ${glow}22 0%, rgba(0,0,0,0.5) 30%, transparent 72%)`,
        transition: "background 1.2s cubic-bezier(0.4,0,0.2,1)",
      }} />

      <style>{`
        .moon3d-scene{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;perspective:1200px}
        .moon3d-halo{position:absolute;width:520px;height:520px;border-radius:9999px;filter:blur(30px);animation:moon3d-pulse 5s ease-in-out infinite}
        .moon3d-ambient-ring{position:absolute;width:460px;height:460px;border-radius:9999px;animation:moon3d-ring-breathe 6s ease-in-out infinite}
        .moon3d-ripple{position:absolute;width:320px;height:320px;border-radius:9999px;border:2px solid;opacity:0;pointer-events:none}
        .moon3d-ripple-2{width:280px;height:280px}
        @media(min-width:768px){.moon3d-ripple{width:420px;height:420px}.moon3d-ripple-2{width:380px;height:380px}}
        .moon3d-sparkle-container{position:absolute;width:0;height:0;pointer-events:none}
        .moon3d-sparkle{position:absolute;top:0;left:0;border-radius:9999px;opacity:0;transform:translate(-50%,-50%)}
        .moon3d-sphere-wrapper{position:relative;transform-style:preserve-3d}
        .moon3d-sphere{position:relative;width:320px;height:320px;border-radius:9999px;transform-style:preserve-3d;animation:moon3d-wobble 11s ease-in-out infinite;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,0.6)}
        @media(min-width:768px){.moon3d-sphere{width:420px;height:420px}.moon3d-halo{width:640px;height:640px}.moon3d-ambient-ring{width:580px;height:580px}}
        .moon3d-svg{position:absolute;inset:0;width:100%;height:100%}
        .moon3d-specular{position:absolute;top:14%;left:26%;width:24%;height:18%;border-radius:9999px;filter:blur(4px);pointer-events:none}
        .moon3d-rim{position:absolute;inset:0;border-radius:9999px;background:radial-gradient(circle at 50% 50%,transparent 74%,rgba(0,0,0,0.55) 100%);pointer-events:none}
        .moon3d-volume{position:absolute;inset:0;border-radius:9999px;pointer-events:none}
        .moon3d-inner-glow{position:absolute;inset:0;border-radius:9999px;pointer-events:none;animation:moon3d-pulse 5s ease-in-out infinite}
        .moon3d-bloom-flash{position:absolute;inset:0;border-radius:9999px;pointer-events:none;mix-blend-mode:screen}
        .moon3d-cast-shadow{margin-top:-14px;width:200px;height:28px;border-radius:9999px;filter:blur(6px)}
        @keyframes moon3d-wobble{0%,100%{transform:rotateY(-8deg) rotateX(2deg)}50%{transform:rotateY(8deg) rotateX(-2deg)}}
        @keyframes moon3d-pulse{0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
        @keyframes moon3d-ring-breathe{0%,100%{opacity:0.5;transform:scale(0.96)}50%{opacity:0.9;transform:scale(1.04)}}
        @keyframes moon3d-ripple-expand{0%{opacity:0.9;transform:scale(0.85)}100%{opacity:0;transform:scale(2.2)}}
        @keyframes moon3d-sparkle-fly{0%{opacity:0;transform:translate(-50%,-50%) scale(0)}15%{opacity:1;transform:translate(calc(-50% + cos(var(--sparkle-angle)) * 20px),calc(-50% + sin(var(--sparkle-angle)) * 20px)) scale(1)}100%{opacity:0;transform:translate(calc(-50% + cos(var(--sparkle-angle)) * var(--sparkle-distance)),calc(-50% + sin(var(--sparkle-angle)) * var(--sparkle-distance))) scale(0.2)}}
        @keyframes moon3d-bump{0%{transform:scale(1) rotateY(-8deg) rotateX(2deg)}30%{transform:scale(1.08) rotateY(-4deg) rotateX(1deg)}100%{transform:scale(1) rotateY(-8deg) rotateX(2deg)}}
        @keyframes moon3d-bloom{0%{opacity:0;transform:scale(0.8)}20%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.15)}}
        @media(prefers-reduced-motion:reduce){.moon3d-sphere,.moon3d-halo,.moon3d-ambient-ring,.moon3d-inner-glow{animation:none}.moon3d-ripple,.moon3d-sparkle,.moon3d-bloom-flash{display:none}}
      `}</style>
    </div>
  );
}
