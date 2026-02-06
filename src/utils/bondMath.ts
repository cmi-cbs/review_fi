/**
 * Bond Math Utilities
 * All calculations assume semi-annual compounding (U.S. convention)
 */

/**
 * Calculate discount factor from spot rate
 * δₙ = 1 / (1 + rₙ/2)^(2n)
 */
export function discountFactor(spotRate: number, years: number): number {
  const periods = years * 2;
  return 1 / Math.pow(1 + spotRate / 2, periods);
}

/**
 * Calculate spot rate from discount factor
 * rₙ = 2 × [(1/δₙ)^(1/2n) - 1]
 */
export function spotRateFromDiscount(df: number, years: number): number {
  const periods = years * 2;
  return 2 * (Math.pow(1 / df, 1 / periods) - 1);
}

/**
 * Calculate zero-coupon bond price from spot rate
 * P = 100 / (1 + r/2)^(2n)
 */
export function zeroCouponPrice(spotRate: number, years: number, faceValue = 100): number {
  return faceValue * discountFactor(spotRate, years);
}

/**
 * Calculate spot rate from zero-coupon bond price
 */
export function spotRateFromPrice(price: number, years: number, faceValue = 100): number {
  const df = price / faceValue;
  return spotRateFromDiscount(df, years);
}

/**
 * Generate cash flows for a coupon bond
 * Returns array of { period, years, cashFlow }
 */
export function generateCashFlows(
  couponRate: number,
  maturityYears: number,
  faceValue = 100
): { period: number; years: number; cashFlow: number }[] {
  const periods = Math.round(maturityYears * 2);
  const semiAnnualCoupon = (couponRate / 2) * faceValue;
  const cashFlows = [];

  for (let i = 1; i <= periods; i++) {
    const years = i / 2;
    const cf = i === periods ? semiAnnualCoupon + faceValue : semiAnnualCoupon;
    cashFlows.push({ period: i, years, cashFlow: cf });
  }

  return cashFlows;
}

/**
 * Price a coupon bond using spot rates
 * P = Σ (CFₜ × δₜ)
 */
export function priceBondWithSpotRates(
  couponRate: number,
  maturityYears: number,
  spotRates: number[], // Array of spot rates for each semi-annual period
  faceValue = 100
): { price: number; breakdown: { years: number; cashFlow: number; spotRate: number; discountFactor: number; presentValue: number }[] } {
  const cashFlows = generateCashFlows(couponRate, maturityYears, faceValue);
  const breakdown = [];
  let totalPrice = 0;

  for (let i = 0; i < cashFlows.length; i++) {
    const cf = cashFlows[i];
    const rate = spotRates[i] ?? spotRates[spotRates.length - 1]; // Use last rate if not enough provided
    const df = discountFactor(rate, cf.years);
    const pv = cf.cashFlow * df;

    breakdown.push({
      years: cf.years,
      cashFlow: cf.cashFlow,
      spotRate: rate,
      discountFactor: df,
      presentValue: pv,
    });

    totalPrice += pv;
  }

  return { price: totalPrice, breakdown };
}

/**
 * Calculate yield-to-maturity using Newton-Raphson method
 * Solves: P = Σ CF/(1+y/2)^i
 */
export function calculateYTM(
  price: number,
  couponRate: number,
  maturityYears: number,
  faceValue = 100,
  tolerance = 1e-8,
  maxIterations = 100
): number {
  const cashFlows = generateCashFlows(couponRate, maturityYears, faceValue);

  // Price function: given y, compute bond price
  const priceAtYield = (y: number): number => {
    let p = 0;
    for (const cf of cashFlows) {
      p += cf.cashFlow / Math.pow(1 + y / 2, cf.period);
    }
    return p;
  };

  // Derivative of price w.r.t. yield
  const dPriceAtYield = (y: number): number => {
    let dp = 0;
    for (const cf of cashFlows) {
      dp -= (cf.period / 2) * cf.cashFlow / Math.pow(1 + y / 2, cf.period + 1);
    }
    return dp;
  };

  // Initial guess: coupon rate
  let y = couponRate > 0 ? couponRate : 0.05;

  for (let i = 0; i < maxIterations; i++) {
    const p = priceAtYield(y);
    const dp = dPriceAtYield(y);

    if (Math.abs(dp) < 1e-12) break;

    const diff = p - price;
    if (Math.abs(diff) < tolerance) break;

    y = y - diff / dp;

    // Keep yield in reasonable bounds
    if (y < -0.5) y = -0.5;
    if (y > 1) y = 1;
  }

  return y;
}

/**
 * Price a bond at a given yield
 * P = Σ CF/(1+y/2)^i
 */
export function priceBondAtYield(
  couponRate: number,
  maturityYears: number,
  ytm: number,
  faceValue = 100
): { price: number; breakdown: { years: number; cashFlow: number; discountFactor: number; presentValue: number }[] } {
  const cashFlows = generateCashFlows(couponRate, maturityYears, faceValue);
  const breakdown = [];
  let totalPrice = 0;

  for (const cf of cashFlows) {
    const df = 1 / Math.pow(1 + ytm / 2, cf.period);
    const pv = cf.cashFlow * df;

    breakdown.push({
      years: cf.years,
      cashFlow: cf.cashFlow,
      discountFactor: df,
      presentValue: pv,
    });

    totalPrice += pv;
  }

  return { price: totalPrice, breakdown };
}

/**
 * Classify bond as premium, par, or discount
 */
export function classifyBond(price: number, faceValue = 100): 'premium' | 'par' | 'discount' {
  const tolerance = 0.01; // $0.01 tolerance for "par"
  if (price > faceValue + tolerance) return 'premium';
  if (price < faceValue - tolerance) return 'discount';
  return 'par';
}

/**
 * Format a number as percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  return (value * 100).toFixed(decimals) + '%';
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number, decimals = 2): string {
  return '$' + value.toFixed(decimals);
}
