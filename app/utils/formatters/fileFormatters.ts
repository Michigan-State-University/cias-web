import mimelite from 'mime';

export const formatMimeFileFormat = (mimeFormat: string) =>
  `.${mimelite.getExtension(mimeFormat)}`;
