export const isNanOrInfinite = (number: number): boolean =>
  Number.isNaN(number) || !Number.isFinite(number);
