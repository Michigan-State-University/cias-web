export interface IHTMLToFileConverter {
  convert(
    element: HTMLElement,
    options?: Partial<HTMLToFileConverterOptions>,
  ): Promise<string>;
}

export interface HTMLToFileConverterOptions {
  width: number;
  height: number;
  backgroundColor: string;
  filter: (domNode: HTMLElement) => boolean;
}
