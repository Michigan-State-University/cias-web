import { toJpeg, toPng, toSvg } from 'html-to-image';

import { HTMLToImageConverter } from './HTMLToImgImpl';
import { IHTMLToFileConverter } from './types';

export class HTMLToFileConverterFactory {
  static toJpg = (): IHTMLToFileConverter => new HTMLToImageConverter(toJpeg);

  static toPng = (): IHTMLToFileConverter => new HTMLToImageConverter(toPng);

  static toSvg = (): IHTMLToFileConverter => new HTMLToImageConverter(toSvg);
}
