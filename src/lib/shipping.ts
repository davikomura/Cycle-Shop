export interface ShippingEstimate {
  price: number;
  minDays: number;
  maxDays: number;
}

// Demonstration table only; prices use the catalog's base currency (EUR).
// Replace with server-side carrier quotations before enabling real shipping.
export function estimateShipping(postalCode: string): ShippingEstimate | null {
  const digits = postalCode.replace(/\D/g, "");
  if (!/^\d{8}$/.test(digits) || /^(\d)\1{7}$/.test(digits)) return null;
  const region = Number(digits[0]);
  if (region <= 3) return { price: 9.9, minDays: 3, maxDays: 6 };
  if (region >= 8) return { price: 14.9, minDays: 5, maxDays: 8 };
  return { price: 19.9, minDays: 7, maxDays: 12 };
}
