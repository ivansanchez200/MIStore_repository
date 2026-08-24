import { useRef, useState } from "react";
import { Moon3D, COLOR_PRESETS, type ColorPreset } from "./Moon3D";
import { ColorSelector } from "./ColorSelector";
import { DecorBackground } from "./DecorBackground";

export function MoonExperience() {
  const [active, setActive] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const changeIdRef = useRef(0);
  const [changeId, setChangeId] = useState(0);

  function handleChange(preset: ColorPreset) {
    if (preset.id === active.id) return;
    setActive(preset);
    changeIdRef.current += 1;
    setChangeId(changeIdRef.current);
  }

  return (
    <section id="experience" className="relative overflow-hidden bg-void py-32 md:py-44">
      <DecorBackground variant="rust" corners={false} diagonals={false} />

      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-[1200ms] ease-out"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${active.glow}10 0%, transparent 60%)`,
        }}
      />

      <div className="container-site relative z-10 flex flex-col items-center text-center">
        {/* Acento superior con líneas */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 moon-line" />
          <p className="text-[11px] uppercase tracking-wide4 text-moonAmber/80">Experience the moon</p>
          <span className="h-px w-8 moon-line" />
        </div>

        <h2 className="max-w-2xl text-3xl font-light leading-tight text-ink md:text-5xl">
          Cada color, una nueva luna.
        </h2>
        <p className="mt-5 max-w-md text-sm font-light text-mute md:text-base">
          LED RGB de 16 millones de colores. Superficie topográfica real impresa en 3D
          que cobra vida con cada toque. Elige tu ambiente.
        </p>
        <div className="mt-16">
          <Moon3D color={active.hex} glow={active.glow} changeId={changeId} />
        </div>
        <div className="mt-16">
          <ColorSelector active={active} onChange={handleChange} />
        </div>
      </div>
    </section>
  );
}
