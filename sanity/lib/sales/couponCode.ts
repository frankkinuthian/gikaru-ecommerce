export const COUPON_CODES = {
  BLACKFRI: "BLACKFRI",
  XMAS2025: "XMAS2025",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
