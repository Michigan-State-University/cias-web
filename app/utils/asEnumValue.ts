export const asEnumValue = <T extends Record<string, string>>(
  enumObject: T,
  value: unknown,
): Nullable<T[keyof T]> =>
  Object.values(enumObject).includes(value as T[keyof T])
    ? (value as T[keyof T])
    : null;
