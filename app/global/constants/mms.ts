import { BYTES_IN_MB } from './file';

export const MMS_LARGE_IMAGE_FILE_FORMATS = [
  'image/jpeg',
  'image/gif',
  'image/png',
];

export const MMS_ACCEPTED_FILE_FORMATS = [
  ...MMS_LARGE_IMAGE_FILE_FORMATS,
  'audio/basic',
  'audio/L24',
  'audio/mp4',
  'audio/mpeg',
  'audio/ogg',
  'audio/vnd.rn-realaudio',
  'audio/vnd.wave',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/ac3',
  'audio/webm',
  'audio/amr-nb',
  'audio/amr',
  'video/mpeg',
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/3gpp',
  'video/3gpp2',
  'video/3gpp-tt',
  'video/H261',
  'video/H263',
  'video/H263-1998',
  'video/H263-2000',
  'video/H264',
  'image/bmp',
  'image/tiff',
  'text/vcard',
  'text/x-vcard',
  'text/csv',
  'text/rtf',
  'text/richtext',
  'text/calendar',
  'text/directory',
  'application/pdf',
  'application/vcard',
  'application/vnd.apple.pkpass',
];

// See https://support.twilio.com/hc/en-us/articles/360018832773-Twilio-Programmable-SMS-Supported-File-Types-and-Size-Limits-for-MMS-Media-Messages#:~:text=Number%20of%20attachments%20supported&text=An%20MMS%20message%20body%20can,your%20message%20request%20will%20fail.
// "An MMS message body can be up to 1600 characters long, which equals 4.8KB..."
// We are rounding up to 10KB for validation messages readability in MMSes sent outside the US
export const MMS_MAX_TEXT_SIZE = 10000;

// 5MB - 10KB = 4.99MB
export const MMS_MAX_FILE_SIZE = 5 * BYTES_IN_MB - MMS_MAX_TEXT_SIZE;

// 600KB
export const MMS_MAX_NON_LARGE_IMAGE_FILE_FORMAT_SIZE = 600000;

export const MMS_MAX_LARGE_IMAGE_FILE_SIZE_MAP = new Map<string, number>(
  MMS_LARGE_IMAGE_FILE_FORMATS.map((format) => [format, MMS_MAX_FILE_SIZE]),
);

export const MAX_SMS_BODY_LENGTH = 1600;
