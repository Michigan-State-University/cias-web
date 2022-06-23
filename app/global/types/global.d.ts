declare type Nullable<T> = T | null | undefined;

// https://stackoverflow.com/a/66144780
declare type KeysWithValuesOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P;
} &
  keyof T;

declare module '*.svg' {
  const content: SVGElement;
  export default content;
}
