declare type Nullable<T> = T | null;

declare module '*.svg' {
  const content: SVGElement;
  export default content;
}
