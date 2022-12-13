export const isNanOrInfinite = (number: number): boolean =>
  Number.isNaN(number) || !Number.isFinite(number);

export const calculateCircleCircumference = (radius: number) =>
  2 * Math.PI * radius;
