export interface IFileDownloader<T> {
  download(data: T, fileNameWithExtension: string, mimeType?: string): void;
}
