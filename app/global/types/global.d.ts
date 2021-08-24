declare type Nullable<T> = T | null | undefined;

declare module '*.svg' {
  const content: SVGElement;
  export default content;
}
