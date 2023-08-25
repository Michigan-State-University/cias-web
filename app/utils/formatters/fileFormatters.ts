import mime from 'mime';

export const formatMimeFileFormat = (mimeFormat: string): string | null => {
  const extension = mime.getExtension(mimeFormat);
  if (!extension) return null;
  return `.${extension}`;
};

export const formatMimeFileFormatList = (mimeFormats: string[]): string =>
  mimeFormats
    .map(formatMimeFileFormat)
    .filter((extension) => extension)
    .join(', ');
