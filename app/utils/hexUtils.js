/**
 * Converts `decimalNumber` to hex string
 * @param {number} decimalNumber
 * @returns {string} Hex string
 */
export const decimalToHex = (decimalNumber) =>
  Number(decimalNumber).toString(16);

/**
 * Converts `hexString` to decimal value
 * @param {string} hexString
 * @returns {number} Decimal value
 */
export const hexToDecimal = (hexString) => parseInt(hexString, 16);
