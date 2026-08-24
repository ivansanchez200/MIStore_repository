import { COLOR_PRESETS, type ColorPreset } from "./Moon3D";
import { cn } from "../lib/utils";

export function ColorSelector({
  active,
  onChange,
}: {
  active: ColorPreset;
  onChange: (preset: ColorPreset) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-[11px] uppercase tracking-wide3 text-mute">
        Color LED — <span className="text-ink">{active.label}</span>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onChange(preset)}
            aria-pressed={active.id === preset.id}
            className={cn(
              "group relative flex flex-col items-center gap-3 rounded-full p-1 transition-all duration-300",
              active.id === preset.id ? "opacity-100" : "opacity-50 hover:opacity-80"
            )}
          >
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
                active.id === preset.id ? "border-white/60 scale-110" : "border-white/15"
              )}
            >
              <span
                className="h-6 w-6 rounded-full transition-transform duration-300"
                style={{
                  backgroundColor: preset.hex,
                  boxShadow: active.id === preset.id
                    ? `0 0 18px 4px ${preset.glow}99, 0 0 6px 1px ${preset.hex}`
                    : `0 0 6px 1px ${preset.hex}55`,
                }}
              />
            </span>
            <span className="text-[10px] uppercase tracking-wide3 text-mute">{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
