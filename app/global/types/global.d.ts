declare type Nullable<T> = T | null | undefined;
declare type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
declare type NormalizedData<TData> = {
  [key: string]: TData;
};
declare type ValueOf<T> = T[keyof T];

// https://stackoverflow.com/a/66144780
declare type KeysWithValuesOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P;
} &
  keyof T;

declare module '*.svg' {
  const content: SVGElement;
  export default content;
}
declare module '*.jpeg' {
  const value: any;
  export = value;
}
declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.png' {
  const value: any;
  export = value;
}
