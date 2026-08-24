import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { formatMoney, cn } from "../lib/utils";

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading, error, updateItem, removeItem } = useCart();
  const lines = cart?.lines ?? [];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) { if (e.key === "Escape") closeCart(); }
    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [isOpen, closeCart]);

  return (
    <div aria-hidden={!isOpen} className={cn("fixed inset-0 z-[60]", isOpen ? "visible" : "invisible delay-300")}>
      <div onClick={closeCart} className={cn("absolute inset-0 bg-black/70 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")} />
      <div role="dialog" aria-modal="true" aria-label="Carrito"
        className={cn("glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between border-b border-line px-8 py-7">
          <h2 className="text-sm uppercase tracking-wide3 text-ink">Carrito</h2>
          <button onClick={closeCart} aria-label="Cerrar" className="text-mute transition-colors hover:text-ink">✕</button>
        </div>
        {error && <p className="mx-8 mt-4 border border-white/10 bg-white/5 px-4 py-3 text-xs font-light text-mute">{error}</p>}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-light text-mute">Tu carrito está vacío.</p>
              <button onClick={closeCart} className="mt-6 border border-line px-6 py-3 text-[11px] uppercase tracking-wide3 text-mute transition-colors duration-300 hover:border-white/40 hover:text-ink">Seguir explorando</button>
            </div>
          ) : (
            <ul className="space-y-7">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden border border-line bg-panel">
                    {line.merchandise.product.featuredImage && (
                      <img src={line.merchandise.product.featuredImage.url} alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm text-ink">{line.merchandise.product.title}</p>
                        {line.merchandise.title !== "Default Title" && <p className="text-xs text-mute">{line.merchandise.title}</p>}
                      </div>
                      <span className="whitespace-nowrap text-xs text-ink">{formatMoney(line.merchandise.price)}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center border border-line">
                        <button disabled={isLoading} onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))} aria-label="Restar" className="px-3 py-1 text-mute transition-colors hover:text-ink disabled:opacity-40">−</button>
                        <span className="w-8 text-center text-xs text-ink">{line.quantity}</span>
                        <button disabled={isLoading} onClick={() => updateItem(line.id, line.quantity + 1)} aria-label="Sumar" className="px-3 py-1 text-mute transition-colors hover:text-ink disabled:opacity-40">+</button>
                      </div>
                      <button disabled={isLoading} onClick={() => removeItem(line.id)} className="text-[11px] text-mute underline-offset-2 transition-colors hover:text-ink hover:underline disabled:opacity-40">Eliminar</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && cart && (
          <div className="border-t border-line px-8 py-7">
            <div className="mb-5 flex items-center justify-between text-sm">
              <span className="text-mute">Subtotal</span>
              <span className="text-ink">{formatMoney(cart.cost.subtotalAmount)}</span>
            </div>
            <a href={cart.checkoutUrl} className="block w-full bg-white py-4 text-center text-[11px] uppercase tracking-wide3 text-black transition-opacity duration-300 hover:opacity-90">Finalizar compra</a>
          </div>
        )}
      </div>
    </div>
  );
}
