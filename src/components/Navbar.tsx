import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { cart, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const count = cart?.totalQuantity ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass" : "border-b border-transparent bg-transparent"}`}>
      <div className="container-site flex h-16 items-center justify-between">
        <a href="#top" className="text-sm font-medium uppercase tracking-wide3 text-white">
          MI Store
        </a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-wide3 text-white/70 md:flex">
          <a href="#experience" className="transition-colors duration-300 hover:text-white">La luna</a>
          <a href="#shop" className="transition-colors duration-300 hover:text-white">Producto</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/project.zip"
            download
            className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-wide3 text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/5 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">
              <path d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden sm:inline">Descargar</span>
          </a>
          <button
            onClick={openCart}
            aria-label={`Carrito, ${count} ${count === 1 ? "producto" : "productos"}`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/5"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 7h15l-1.5 9.5a2 2 0 0 1-2 1.7H8.7a2 2 0 0 1-2-1.7L5 4H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="21" r="1.1" fill="currentColor" />
              <circle cx="18" cy="21" r="1.1" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
