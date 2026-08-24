import { DecorBackground } from "./DecorBackground";

export function Statement() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-void px-6 py-32 md:py-44">
      <DecorBackground variant="amber" />

      {/* Líneas verticales laterales */}
      <div className="moon-line-vertical absolute left-6 top-1/4 bottom-1/4 w-px opacity-60" />
      <div className="moon-line-vertical absolute right-6 top-1/4 bottom-1/4 w-px opacity-60" />

      <div className="container-site relative z-10 text-center">
        {/* Acento superior */}
        <div className="mx-auto mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-8 moon-line" />
          <p
            className="animate-fadeUp text-[11px] uppercase tracking-wide4 text-moonAmber/80"
            style={{ animationDelay: "0.1s" }}
          >
            La experiencia
          </p>
          <span className="h-px w-8 moon-line" />
        </div>

        <h2
          className="mx-auto mt-2 max-w-4xl animate-fadeUp text-3xl font-light leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          style={{ animationDelay: "0.25s" }}
        >
          No es una lámpara.
          <br />
          <span className="text-moonWarm">Es la luna.</span>
          <br />
          En tu habitación.
        </h2>
        <p
          className="mx-auto mt-10 max-w-xl animate-fadeUp text-sm font-light leading-relaxed text-mute md:text-base"
          style={{ animationDelay: "0.4s" }}
        >
          Impresa en 3D a partir de datos topográficos reales de la superficie lunar.
          Iluminada por LED RGB con 16 millones de colores. Cada cráter, cada mar,
          cada detalle — fiel a la luna que ves en el cielo.
        </p>
        <div
          className="mx-auto mt-12 h-px w-16 animate-lineGrow moon-line"
          style={{ animationDelay: "0.6s" }}
        />
        <a
          href="#experience"
          className="mt-12 inline-block animate-fadeUp text-[11px] uppercase tracking-wide3 text-moonAmber/70 transition-colors duration-300 hover:text-moonAmber"
          style={{ animationDelay: "0.75s" }}
        >
          Descúbrelo ↓
        </a>
      </div>
    </section>
  );
}
