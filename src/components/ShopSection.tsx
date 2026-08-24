import { useEffect, useState } from "react";
import { getFeaturedCollection } from "../lib/shopify";
import type { Product, ProductVariant } from "../lib/types";
import { formatMoney, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { DecorBackground } from "./DecorBackground";

const SPECS = [
  { title: "Dimensiones", content: "Disponible en 15 cm y 20 cm de diámetro. Base incluida en madera de nogal." },
  { title: "Iluminación LED", content: "LED RGB de 16 millones de colores con control total desde la app o el control remoto. Modos de color fijo, transición suave y pulso rítmico." },
  { title: "Batería", content: "Batería recargable de litio, hasta 12 horas de autonomía. Carga USB-C incluida." },
  { title: "Control", content: "Control táctil en la base y control remoto incluido. App compatible con iOS y Android." },
  { title: "Material", content: "Impresión 3D en PLA de alta densidad con acabado translúcido, a partir de datos topográficos reales de la superficie lunar." },
];

const SIZES = ["15 cm", "20 cm"];

const FEATURES = [
  { label: "Impresión 3D realista" },
  { label: "16M colores" },
  { label: "Control táctil" },
  { label: "Envío gratis" },
];

function SpecRow({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between py-5 text-left">
        <span className="text-sm uppercase tracking-wide3 text-ink">{title}</span>
        <span className={cn("text-moonAmber/60 transition-transform duration-300", open && "rotate-45")} aria-hidden="true">+</span>
      </button>
      <div className={cn("grid overflow-hidden transition-all duration-300 ease-out", open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <p className="overflow-hidden text-sm font-light leading-relaxed text-mute">{content}</p>
      </div>
    </div>
  );
}

export function ShopSection() {
  const { addItem, isLoading } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState(SIZES[0]);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const handle = import.meta.env.VITE_SHOPIFY_FEATURED_COLLECTION || "lamparas-de-luna";
    getFeaturedCollection(handle).then((r) => {
      if (!r.ok) { setError(r.error); return; }
      setProduct(r.data.products[0] ?? null);
    });
  }, []);

  const variant: ProductVariant | undefined = product?.variants.find((v) =>
    v.selectedOptions.some((o) => o.value === size)
  ) ?? product?.variants[0];

  async function handleBuy() {
    if (!variant) return;
    await addItem(variant.id, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <section id="shop" className="relative overflow-hidden bg-void py-32 md:py-44">
      <DecorBackground variant="amber" corners={false} diagonals={false} />

      {/* Línea vertical lateral */}
      <div className="moon-line-vertical absolute left-6 top-20 bottom-20 w-px opacity-40" />

      <div className="container-site relative z-10">
        {/* Encabezado con acentos */}
        <div className="mb-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 moon-line" />
            <p className="text-[11px] uppercase tracking-wide4 text-moonAmber/80">Edición actual</p>
            <span className="h-px w-8 moon-line" />
          </div>
          <h2 className="text-4xl font-light leading-tight text-ink md:text-5xl">La Lámpara Lunar LED</h2>
          <div className="mx-auto mt-6 h-px w-20 animate-lineGrow moon-line" />
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          {/* Imagen del producto */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md overflow-hidden moon-border border bg-panel">
              {/* Brillo sutil detrás del producto */}
              <div className="absolute inset-0 bg-gradient-to-br from-moonAmber/10 via-transparent to-moonRust/10" />
              {product?.featuredImage ? (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  loading="lazy"
                  className="relative h-full w-full object-cover"
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center text-[11px] uppercase tracking-wide3 text-mute2">
                  Vista de producto
                </div>
              )}
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-light leading-relaxed text-mute md:text-base">
              {product?.description || "Una réplica hiperrealista de la superficie lunar, impresa en 3D e iluminada desde su interior con LED RGB de 16 millones de colores. Objeto de diseño, no solo una lámpara."}
            </p>
            {error && (
              <p className="mt-4 text-xs font-light text-mute/70">
                No pudimos conectar con el catálogo en vivo ({error}). Mostrando información de referencia.
              </p>
            )}

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {FEATURES.map((f) => (
                <span key={f.label} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-mute">
                  <span className="h-1 w-1 rounded-full bg-moonAmber" />
                  {f.label}
                </span>
              ))}
            </div>

            {/* Tamaño */}
            <div className="mt-10">
              <p className="mb-3 text-[11px] uppercase tracking-wide3 text-mute">Tamaño</p>
              <div className="flex gap-3">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "border px-6 py-3 text-sm transition-colors duration-300",
                      size === s
                        ? "border-moonAmber text-ink"
                        : "border-line text-mute hover:border-white/40 hover:text-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-3xl font-light text-ink">{variant ? formatMoney(variant.price) : "—"}</span>
              <span className="text-[10px] uppercase tracking-widest text-mute2">Envío gratis</span>
            </div>

            {/* Botón de compra con efecto sweep */}
            <button
              onClick={handleBuy}
              disabled={isLoading || !variant}
              className={cn(
                "group relative mt-8 w-full overflow-hidden py-5 text-[11px] uppercase tracking-wide3 transition-all duration-300 md:w-auto md:px-20",
                justAdded
                  ? "bg-panel2 text-moonAmber"
                  : "bg-white text-black hover:bg-moonAmber hover:shadow-[0_0_50px_rgba(201,168,106,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
              )}
            >
              <span className="relative z-10">
                {justAdded ? "Agregado ✓" : isLoading ? "Agregando..." : "Añadir al carrito"}
              </span>
              {!justAdded && (
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-sweep" />
              )}
            </button>

            {/* Specs */}
            <div className="mt-14">
              {SPECS.map((spec) => <SpecRow key={spec.title} title={spec.title} content={spec.content} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
