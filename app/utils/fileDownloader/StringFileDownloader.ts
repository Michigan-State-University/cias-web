import { IFileDownloader } from './types';

export class StringFileDownloader implements IFileDownloader<string> {
  download(data: string, fileNameWithExtension: string): void {
    const temporaryLink = document.createElement('a');
    temporaryLink.download = fileNameWithExtension;
    temporaryLink.href = data;

    temporaryLink.click();
  }
}
