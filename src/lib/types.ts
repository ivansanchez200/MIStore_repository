export interface ShopifyImage {
  url: string; altText: string | null; width: number; height: number;
}
export interface MoneyV2 { amount: string; currencyCode: string; }
export interface ProductVariant {
  id: string; title: string; availableForSale: boolean;
  quantityAvailable: number | null; price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
}
export interface Product {
  id: string; handle: string; title: string; description: string;
  featuredImage: ShopifyImage | null; images: ShopifyImage[];
  priceRange: { minVariantPrice: MoneyV2; maxVariantPrice: MoneyV2; };
  variants: ProductVariant[]; tags: string[];
}
export interface CartLine {
  id: string; quantity: number;
  merchandise: {
    id: string; title: string;
    product: { title: string; handle: string; featuredImage: ShopifyImage | null; };
    price: MoneyV2;
  };
}
export interface Cart {
  id: string; checkoutUrl: string; totalQuantity: number;
  cost: { subtotalAmount: MoneyV2; totalAmount: MoneyV2; };
  lines: CartLine[];
}
export type ShopifyResult<T> = { ok: true; data: T } | { ok: false; error: string };
