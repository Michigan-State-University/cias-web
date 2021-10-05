type UpperAlphabetic =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type SnakeUnderscore<
  First extends string,
  Second extends string,
> = First extends UpperAlphabetic | '' | '_'
  ? ''
  : Second extends UpperAlphabetic
  ? '_'
  : '';

type ToSnakeCase<
  S extends string,
  Previous extends string,
> = S extends `${infer First}${infer Second}${infer Rest}`
  ? `${SnakeUnderscore<Previous, First>}${Lowercase<First>}${SnakeUnderscore<
      First,
      Second
    >}${Lowercase<Second>}${ToSnakeCase<Rest, First>}`
  : S extends `${infer First}`
  ? `${SnakeUnderscore<Previous, First>}${Lowercase<First>}`
  : '';

type SnakeCase<S extends string> = ToSnakeCase<S, ''>;

/**
 * IMPORTANT: Supports keys with a max length of 37 characters.
 * Properties with keys longer than that will be omitted
 * Does not work recursively
 */
export type CamelToSnake<T> = {
  [K in keyof T as SnakeCase<Extract<K, string>>]: T[K];
};

/**
 * IMPORTANT: Supports keys with a max length of 37 characters.
 * Properties with keys longer than that will be omitted
 * Does not work recursively
 */
export type CamelToSnakeOmitId<T> = Omit<CamelToSnake<T>, 'id'>;
