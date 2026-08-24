import { Starfield } from "./Starfield";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <Starfield count={60} />
      <img
        src="/Untitled_(1000_x_1500_mm).png"
        alt="Luna entre nubes"
        className="relative h-full w-full object-contain"
      />

      {/* Degradado de transición hacia la siguiente sección */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[40vh] bg-gradient-to-b from-transparent via-[#07070A]/60 to-[#07070A]" />

      {/* Texto mínimo + scroll */}
      <a
        href="#experience"
        className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 group-hover:text-white">
          Ver la luna
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent transition-all duration-500 group-hover:h-16 group-hover:from-white" />
      </a>
    </section>
  );
}
