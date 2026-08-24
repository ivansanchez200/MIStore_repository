import { DecorBackground } from "./DecorBackground";

export function BuyCTA() {
  return (
    <section className="relative overflow-hidden bg-void px-6 py-32 md:py-48">
      <DecorBackground variant="warm" />

      {/* Línea vertical central decorativa */}
      <div className="moon-line-vertical absolute left-1/2 top-1/2 h-40 w-px -translate-x-1/2 -translate-y-1/2 opacity-50" />

      <div className="container-site relative z-10 flex flex-col items-center text-center">
        {/* Acento superior */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 moon-line" />
          <p
            className="animate-fadeUp text-[11px] uppercase tracking-wide4 text-moonAmber/80"
            style={{ animationDelay: "0.15s" }}
          >
            Tu luna te espera
          </p>
          <span className="h-px w-8 moon-line" />
        </div>

        <h2
          className="mt-2 max-w-3xl animate-fadeUp text-4xl font-light leading-[1.05] tracking-tight text-ink md:text-6xl"
          style={{ animationDelay: "0.3s" }}
        >
          Cómpralo ya.
        </h2>
        <p
          className="mt-6 max-w-md animate-fadeUp text-sm font-light leading-relaxed text-mute md:text-base"
          style={{ animationDelay: "0.45s" }}
        >
          Lleva la luna a tu espacio. Impresión 3D realista, 16 millones de colores,
          control táctil y envío gratis.
        </p>

        {/* Beneficios rápidos */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 animate-fadeUp" style={{ animationDelay: "0.5s" }}>
          {["Envío gratis", "30 días de garantía", "Control táctil", "16M colores"].map((b) => (
            <span key={b} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-mute">
              <span className="h-1 w-1 rounded-full bg-moonAmber" />
              {b}
            </span>
          ))}
        </div>

        <a
          href="#shop"
          className="group mt-12 animate-fadeUp flex flex-col items-center gap-3"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Botón con efecto sweep */}
          <span className="relative overflow-hidden bg-white px-12 py-5 text-[11px] uppercase tracking-wide3 text-black transition-all duration-300 group-hover:bg-moonAmber group-hover:shadow-[0_0_50px_rgba(201,168,106,0.45)]">
            <span className="relative z-10">Ver producto</span>
            <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep" />
          </span>
          <span className="text-[10px] uppercase tracking-widest text-mute transition-colors duration-300 group-hover:text-moonAmber/80">
            Desliza ↓
          </span>
        </a>
      </div>
    </section>
  );
}
