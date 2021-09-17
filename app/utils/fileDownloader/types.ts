export interface IFileDownloader<T> {
  download(data: T, fileNameWithExtension: string): void;
}
