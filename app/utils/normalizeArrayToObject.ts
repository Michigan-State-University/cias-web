/* eslint-disable */
/**
 * Creates an object where keys are the items' identifiers and values are the items itself
 * Allows faster item accessing than using Array.prototype.find()
 */
export const normalizeArrayToObject = <
  TItem extends object,
  TIdKey extends KeysWithValuesOfType<TItem, string | number | symbol>,
>(
  array: TItem[],
  itemIdKey: TIdKey,
): { [key: string]: TItem } =>
  array.reduce((normalized, item) => {
    const key = String(item[itemIdKey]);
    // Param reassign used for improving performance
    // eslint-disable-next-line no-param-reassign
    normalized[key] = item;
    return normalized;
  }, {} as { [key: string]: TItem });
