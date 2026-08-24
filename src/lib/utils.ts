import type { MoneyV2 } from "./types";
export function formatMoney(money: MoneyV2, locale = "es-BO"): string {
  const amount = Number(money.amount);
  if (Number.isNaN(amount)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency", currency: money.currencyCode,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
