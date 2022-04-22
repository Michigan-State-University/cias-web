/* eslint-disable no-bitwise */
/**
 * @param  {string} hex
 */
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r},${g},${b}`;
};

export { hexToRgb };
