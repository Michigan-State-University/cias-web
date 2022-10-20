declare type Nullable<T> = T | null | undefined;
declare type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
declare type NormalizedData<TData> = {
  [key: string]: TData;
};
declare type ValueOf<T> = T[keyof T];

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
