import { toJpeg, toPng, toSvg } from 'html-to-image';

import { HTMLToFileConverterOptions, IHTMLToFileConverter } from './types';

type Converter = typeof toJpeg | typeof toPng | typeof toSvg;

export class HTMLToImageConverter implements IHTMLToFileConverter {
  converter: Converter;

  constructor(converter: Converter) {
    this.converter = converter;
  }

  convert(
    element: HTMLElement,
    options?: Partial<HTMLToFileConverterOptions>,
  ): Promise<string> {
    return this.converter(element, { ...options, cacheBust: true });
  }
}
