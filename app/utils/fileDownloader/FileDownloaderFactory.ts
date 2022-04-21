import { StringFileDownloader } from './StringFileDownloader';

export class FileDownloaderFactory {
  static stringFileDownloader = () => new StringFileDownloader();
}
