import { DecorBackground } from "./DecorBackground";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-void py-16">
      <DecorBackground variant="amber" corners={false} grid={false} diagonals={false} />

      <div className="container-site relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
        <p className="text-[11px] uppercase tracking-wide3 text-mute">© {new Date().getFullYear()} MI Store</p>
        <div className="flex gap-8 text-[11px] uppercase tracking-wide3 text-mute">
          <a href="#" className="transition-colors duration-300 hover:text-moonAmber">Envíos</a>
          <a href="#" className="transition-colors duration-300 hover:text-moonAmber">Privacidad</a>
          <a href="#" className="transition-colors duration-300 hover:text-moonAmber">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
