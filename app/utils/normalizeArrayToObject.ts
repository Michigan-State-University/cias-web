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
) =>
  array.reduce((normalized, item) => {
    // Param reassign used for improving performance
    // eslint-disable-next-line no-param-reassign
    normalized[item[itemIdKey]] = item;
    return normalized;
    // Ts-ignore used as linter does not recognize that TItem[TIdKey] can be a key
    // @ts-ignore
  }, {} as Record<TItem[TIdKey], TItem>);
