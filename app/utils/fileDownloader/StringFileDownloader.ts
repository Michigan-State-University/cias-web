import { IFileDownloader } from './types';

export class StringFileDownloader implements IFileDownloader<string> {
  download(
    data: string,
    fileNameWithExtension: string,
    mimeType?: string,
  ): void {
    const temporaryLink = document.createElement('a');
    temporaryLink.setAttribute('download', fileNameWithExtension);
    temporaryLink.setAttribute(
      'href',
      `data:${mimeType ?? 'text/plain'};charset=utf-8,${encodeURIComponent(
        data,
      )}`,
    );

    document.body.appendChild(temporaryLink);
    temporaryLink.click();
    document.body.removeChild(temporaryLink);
  }
}
