import { MarkupFileDownloader } from './MarkupFileDownloader';
import { StringFileDownloader } from './StringFileDownloader';

export class FileDownloaderFactory {
  static markupFileDownloader = () => new MarkupFileDownloader();

  static stringFileDownloader = () => new StringFileDownloader();
}
