import byteSize from 'byte-size';
import mime from 'mime';

const KIB = 1024;
const MIB = KIB * KIB;
const GIB = MIB * KIB;

const BINARY_UNITS = {
  binary: [
    { from: 0, to: KIB, unit: 'B', long: 'bytes' },
    { from: KIB, to: MIB, unit: 'KB', long: 'kilobytes' },
    { from: MIB, to: GIB, unit: 'MB', long: 'megabytes' },
    { from: GIB, to: Number.MAX_VALUE, unit: 'GB', long: 'gigabytes' },
  ],
};

export const formatFileSize = (bytes: number, precision = 0): string => {
  const { value, unit } = byteSize(bytes, {
    precision,
    units: 'binary',
    customUnits: BINARY_UNITS,
  });

  const trimmed = value.includes('.') ? value.replace(/\.?0+$/, '') : value;

  return `${trimmed} ${unit}`;
};

const MAX_FILENAME_LENGTH = 255;
const FALLBACK_FILENAME = 'file';

const UNSAFE_CHARACTERS =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u001F\u007F-\u009F\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

export const sanitizeFilename = (filename: string): string => {
  const withoutPath = filename.split(/[/\\]/).pop() ?? '';
  const cleaned = withoutPath.replace(UNSAFE_CHARACTERS, '').trim();

  if (!cleaned || cleaned === '.' || cleaned === '..') return FALLBACK_FILENAME;
  if (cleaned.length <= MAX_FILENAME_LENGTH) return cleaned;

  const lastDot = cleaned.lastIndexOf('.');
  const extension = lastDot > 0 ? cleaned.slice(lastDot) : '';
  const stem = lastDot > 0 ? cleaned.slice(0, lastDot) : cleaned;

  return `${stem.slice(0, MAX_FILENAME_LENGTH - extension.length)}${extension}`;
};

export const ensureFilenameMatchesType = (
  filename: string,
  contentType: string,
  acceptedExtensions?: string[],
): string => {
  const expected = contentType ? mime.getExtension(contentType) : null;
  if (!expected) return filename;

  const lastDot = filename.lastIndexOf('.');
  const current =
    lastDot > 0 ? filename.slice(lastDot + 1).toLowerCase() : null;

  if (current && mime.getType(current) === mime.getType(expected)) {
    return filename;
  }

  if (current && acceptedExtensions?.includes(current)) return filename;

  const suffix = `.${expected}`;

  return `${filename.slice(0, MAX_FILENAME_LENGTH - suffix.length)}${suffix}`;
};

export const formatMimeFileFormat = (mimeFormat: string): string | null => {
  if (mimeFormat.startsWith('.')) return mimeFormat.toLowerCase();

  const extension = mime.getExtension(mimeFormat);
  if (!extension) return null;
  return `.${extension}`;
};

export const formatMimeFileFormatList = (mimeFormats: string[]): string =>
  Array.from(
    new Set(
      mimeFormats
        .map(formatMimeFileFormat)
        .filter((extension): extension is string => !!extension),
    ),
  ).join(', ');

export const buildFileAcceptMap = (
  formats: string[],
): Record<string, string[]> => {
  const accept = new Map<string, Set<string>>();

  formats.forEach((format) => {
    if (!format.startsWith('.')) {
      if (!accept.has(format)) accept.set(format, new Set());
      return;
    }

    const extension = format.toLowerCase();
    const mimeType = mime.getType(extension);

    if (!mimeType) {
      if (!accept.has(extension)) accept.set(extension, new Set());
      return;
    }

    const extensions = accept.get(mimeType) ?? new Set<string>();
    extensions.add(extension);
    accept.set(mimeType, extensions);
  });

  return Object.fromEntries(
    Array.from(accept, ([mimeType, extensions]) => [
      mimeType,
      Array.from(extensions),
    ]),
  );
};
