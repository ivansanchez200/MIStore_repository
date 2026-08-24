import type { Cart, Product, ShopifyResult } from "./types";
const DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || "2024-07";
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
interface GQLResponse<T> { data?: T; errors?: { message: string }[]; }
async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<ShopifyResult<T>> {
  if (!DOMAIN || !TOKEN) return { ok: false, error: "Shopify no configurado." };
  try {
    const res = await fetch(`https://${DOMAIN}/api/${VERSION}/graphql.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": TOKEN },
      body: JSON.stringify({ query, variables }),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const json = (await res.json()) as GQLResponse<T>;
    if (json.errors?.length) return { ok: false, error: json.errors[0].message };
    if (!json.data) return { ok: false, error: "Respuesta vacía." };
    return { ok: true, data: json.data };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error de red." };
  }
}
const PRODUCT_FRAGMENT = `fragment PC on Product {
  id handle title description tags
  featuredImage { url(transform:{maxWidth:1200,maxHeight:1200}) altText width height }
  priceRange { minVariantPrice{amount currencyCode} maxVariantPrice{amount currencyCode} }
}`;
const COLLECTION_Q = `${PRODUCT_FRAGMENT}
query($handle:String!,$first:Int=24){collection(handle:$handle){title products(first:$first,sortKey:BEST_SELLING){edges{node{...PC}}}}}`;
const ALL_Q = `${PRODUCT_FRAGMENT}
query($first:Int=24){products(first:$first,sortKey:BEST_SELLING){edges{node{...PC}}}}`;
const CART_F = `fragment CF on Cart {
  id checkoutUrl totalQuantity
  cost{subtotalAmount{amount currencyCode}totalAmount{amount currencyCode}}
  lines(first:50){edges{node{id quantity merchandise{...on ProductVariant{id title price{amount currencyCode}product{title handle featuredImage{url(transform:{maxWidth:200,maxHeight:200})altText width height}}}}}}}
}`;
const CART_CREATE = `${CART_F} mutation($lines:[CartLineInput!]!){cartCreate(input:{lines:$lines}){cart{...CF}userErrors{message}}}`;
const CART_ADD = `${CART_F} mutation($cartId:ID!,$lines:[CartLineInput!]!){cartLinesAdd(cartId:$cartId,lines:$lines){cart{...CF}userErrors{message}}}`;
const CART_UPDATE = `${CART_F} mutation($cartId:ID!,$lines:[CartLineUpdateInput!]!){cartLinesUpdate(cartId:$cartId,lines:$lines){cart{...CF}userErrors{message}}}`;
const CART_REMOVE = `${CART_F} mutation($cartId:ID!,$lineIds:[ID!]!){cartLinesRemove(cartId:$cartId,lineIds:$lineIds){cart{...CF}userErrors{message}}}`;
const CART_Q = `${CART_F} query($cartId:ID!){cart(id:$cartId){...CF}}`;
interface RawCard { id:string;handle:string;title:string;description:string;tags:string[];featuredImage:Product["featuredImage"];priceRange:Product["priceRange"]; }
function norm(n: RawCard): Product {
  return { id:n.id,handle:n.handle,title:n.title,description:n.description,tags:n.tags,featuredImage:n.featuredImage,images:n.featuredImage?[n.featuredImage]:[],priceRange:n.priceRange,variants:[] };
}
export async function getFeaturedCollection(handle: string): Promise<ShopifyResult<{title:string;products:Product[]}>> {
  const r = await gql<{collection:{title:string;products:{edges:{node:RawCard}[]}}|null}>(COLLECTION_Q,{handle});
  if (!r.ok) return r;
  if (!r.data.collection) {
    const fb = await gql<{products:{edges:{node:RawCard}[]}}>(ALL_Q);
    if (!fb.ok) return fb;
    return {ok:true,data:{title:"Catálogo",products:fb.data.products.edges.map(e=>norm(e.node))}};
  }
  return {ok:true,data:{title:r.data.collection.title,products:r.data.collection.products.edges.map(e=>norm(e.node))}};
}
const CART_KEY = "mi_cart_id";
interface RawMut {
  cartCreate?:{cart:Cart|null;userErrors:{message:string}[]};
  cartLinesAdd?:{cart:Cart|null;userErrors:{message:string}[]};
  cartLinesUpdate?:{cart:Cart|null;userErrors:{message:string}[]};
  cartLinesRemove?:{cart:Cart|null;userErrors:{message:string}[]};
}
export async function getCart(): Promise<Cart|null> {
  const id = localStorage.getItem(CART_KEY);
  if (!id) return null;
  const r = await gql<{cart:Cart|null}>(CART_Q,{cartId:id});
  return r.ok ? r.data.cart : null;
}
export async function addToCart(variantId: string, quantity=1): Promise<ShopifyResult<Cart>> {
  const existingId = localStorage.getItem(CART_KEY);
  const lines = [{merchandiseId:variantId,quantity}];
  if (!existingId) {
    const r = await gql<RawMut>(CART_CREATE,{lines});
    if (!r.ok) return r;
    const ue = r.data.cartCreate?.userErrors[0];
    if (ue) return {ok:false,error:ue.message};
    const cart = r.data.cartCreate?.cart;
    if (!cart) return {ok:false,error:"No se pudo crear carrito."};
    localStorage.setItem(CART_KEY,cart.id);
    return {ok:true,data:cart};
  }
  const r = await gql<RawMut>(CART_ADD,{cartId:existingId,lines});
  if (!r.ok) return r;
  const ue = r.data.cartLinesAdd?.userErrors[0];
  if (ue) return {ok:false,error:ue.message};
  const cart = r.data.cartLinesAdd?.cart;
  if (!cart) return {ok:false,error:"No se pudo actualizar carrito."};
  return {ok:true,data:cart};
}
export async function updateCartLine(lineId: string, quantity: number): Promise<ShopifyResult<Cart>> {
  const cartId = localStorage.getItem(CART_KEY);
  if (!cartId) return {ok:false,error:"Sin carrito."};
  const r = await gql<RawMut>(CART_UPDATE,{cartId,lines:[{id:lineId,quantity}]});
  if (!r.ok) return r;
  const cart = r.data.cartLinesUpdate?.cart;
  if (!cart) return {ok:false,error:"Error al actualizar."};
  return {ok:true,data:cart};
}
export async function removeCartLine(lineId: string): Promise<ShopifyResult<Cart>> {
  const cartId = localStorage.getItem(CART_KEY);
  if (!cartId) return {ok:false,error:"Sin carrito."};
  const r = await gql<RawMut>(CART_REMOVE,{cartId,lineIds:[lineId]});
  if (!r.ok) return r;
  const cart = r.data.cartLinesRemove?.cart;
  if (!cart) return {ok:false,error:"Error al eliminar."};
  return {ok:true,data:cart};
}
