import { Starfield } from "./Starfield";

interface DecorProps {
  variant?: "amber" | "warm" | "rust";
  corners?: boolean;
  grid?: boolean;
  diagonals?: boolean;
}

export function DecorBackground({ variant = "amber", corners = true, grid = true, diagonals = true }: DecorProps) {
  const stainClass =
    variant === "amber" ? "moon-stain-amber" :
    variant === "warm" ? "moon-stain-warm" :
    "moon-stain-rust";

  return (
    <>
      {/* Estrellas sutiles */}
      {grid && <Starfield />}

      {/* Manchas de color */}
      <div className={`moon-stain ${stainClass} animate-drift`} style={{ width: 550, height: 550, top: "-5%", left: "-8%" }} />
      <div className={`moon-stain ${stainClass} animate-driftSlow`} style={{ width: 400, height: 400, bottom: "-5%", right: "-8%", animationDelay: "5s" }} />
      <div className="moon-stain moon-stain-warm animate-drift" style={{ width: 300, height: 300, top: "40%", right: "15%", animationDelay: "3s", opacity: 0.12 }} />

      {/* Glows superior e inferior */}
      <div className="decor-glow-top" />
      <div className="decor-glow-bottom" />

      {/* Líneas diagonales sutiles */}
      {diagonals && (
        <>
          <div className="decor-diagonal" style={{ top: "15%", left: 0, right: 0, transform: "rotate(-8deg)" }} />
          <div className="decor-diagonal" style={{ top: "65%", left: 0, right: 0, transform: "rotate(6deg)" }} />
        </>
      )}

      {/* Líneas de borde superior e inferior */}
      <div className="moon-line absolute left-0 right-0 top-0 h-px" />
      <div className="moon-line-rust absolute left-0 right-0 bottom-0 h-px" />
    </>
  );
}
