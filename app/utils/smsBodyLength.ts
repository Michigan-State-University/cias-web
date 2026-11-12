/**
 * SMS body length / segment counting for custom SMS campaigns.
 * Mirrors the backend algorithm (`body_length.rb`)
 */

import { SmsCampaignLink, SmsCampaignMeta } from 'models/SmsCampaign';

export enum SmsEncoding {
  GSM7 = 'GSM7',
  UCS2 = 'UCS2',
}

export type SmsBodyLength = {
  /** Length in UTF-16 units of the body as the recipient will receive it. */
  length: number;
  /** Number of SMS segments the message will be split into. */
  segments: number;
  encoding: SmsEncoding;
  lengthExceeded: boolean;
  segmentsExceeded: boolean;
};

const GSM7_BASIC_CHARACTERS =
  '@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà';

const GSM7_EXTENDED_CHARACTERS = '\f^{}\\[~]|€';

const GSM7_BASIC_SET = new Set(GSM7_BASIC_CHARACTERS.split(''));
const GSM7_EXTENDED_SET = new Set(GSM7_EXTENDED_CHARACTERS.split(''));

const LINK_VARIABLE_PATTERN = /::([^:]+)::/g;

const normalize = (body: string): string => body.normalize('NFC');

/**
 * Replaces every `::variable::` that has a matching link with a placeholder of
 * the length the tracked link will have, then appends the personal link the
 * backend adds on a new line. The result is what the participant receives.
 */
export const buildResolvedSmsBody = (
  body: string,
  links: SmsCampaignLink[],
  meta: SmsCampaignMeta,
): string => {
  const linkedVariables = new Set(links.map(({ variable }) => variable));

  const withTrackedLinks = normalize(body).replace(
    LINK_VARIABLE_PATTERN,
    (match, variable: string) =>
      linkedVariables.has(variable)
        ? 'x'.repeat(meta.trackedLinkExpectedLength)
        : match,
  );

  return `${withTrackedLinks}\n${'x'.repeat(meta.personalLinkExpectedLength)}`;
};

/**
 * One pass over the text yields both facts the counter needs: whether every
 * character fits GSM-7, and how many of them are extended characters (which
 * cost two septets each). Iterates UTF-16 units, exactly as the backend does.
 *
 * Bails out on the first non-GSM-7 character: `extendedCount` is only ever
 * read for a GSM-7 text, and messages in Polish fail on their first diacritic.
 */
const scanGsm7 = (text: string): { isGsm7: boolean; extendedCount: number } => {
  let extendedCount = 0;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (GSM7_EXTENDED_SET.has(char)) extendedCount += 1;
    else if (!GSM7_BASIC_SET.has(char))
      return { isGsm7: false, extendedCount: 0 };
  }

  return { isGsm7: true, extendedCount };
};

const countSegments = (
  text: string,
  encoding: SmsEncoding,
  extendedCount: number,
  meta: SmsCampaignMeta,
): number => {
  const [singleLength, multiLength] =
    encoding === SmsEncoding.GSM7
      ? meta.gsm7SegmentLengths
      : meta.ucs2SegmentLengths;

  const units =
    encoding === SmsEncoding.GSM7 ? text.length + extendedCount : text.length;

  if (units === 0) return 0;
  if (units <= singleLength) return 1;
  return Math.ceil(units / multiLength);
};

export const isSmsBodyValid = (body: string, counter: SmsBodyLength): boolean =>
  !!body.trim() && !counter.lengthExceeded && !counter.segmentsExceeded;

export const calculateSmsBodyLength = (
  body: string,
  links: SmsCampaignLink[],
  meta: SmsCampaignMeta,
): SmsBodyLength => {
  const resolvedBody = buildResolvedSmsBody(body, links, meta);
  const { isGsm7, extendedCount } = scanGsm7(resolvedBody);
  const encoding = isGsm7 ? SmsEncoding.GSM7 : SmsEncoding.UCS2;
  const segments = countSegments(resolvedBody, encoding, extendedCount, meta);

  return {
    length: resolvedBody.length,
    segments,
    encoding,
    lengthExceeded: resolvedBody.length > meta.maxBodyLength,
    segmentsExceeded: segments > meta.maxSegments,
  };
};

export type NonGsm7Character = {
  character: string;
  replacement: string | null;
};

const character = (codePoint: number) => String.fromCodePoint(codePoint);

const GSM7_EQUIVALENT_CODE_POINTS: [number, string][] = [
  // Single quotes and apostrophes: ‘ ’ ‚ ‛ ′ ´
  [0x2018, "'"],
  [0x2019, "'"],
  [0x201a, "'"],
  [0x201b, "'"],
  [0x2032, "'"],
  [0x00b4, "'"],
  // Double quotes: “ ” „ ‟ ″ « »
  [0x201c, '"'],
  [0x201d, '"'],
  [0x201e, '"'],
  [0x201f, '"'],
  [0x2033, '"'],
  [0x00ab, '"'],
  [0x00bb, '"'],
  // Dashes: ‐ ‑ ‒ – — ― −
  [0x2010, '-'],
  [0x2011, '-'],
  [0x2012, '-'],
  [0x2013, '-'],
  [0x2014, '-'],
  [0x2015, '-'],
  [0x2212, '-'],
  // Other punctuation: … • · ⁄
  [0x2026, '...'],
  [0x2022, '*'],
  [0x00b7, '.'],
  [0x2044, '/'],
  // Spaces that are not a space, and a tab. Kept as a space rather than
  // removed (which is what Twilio's Smart Encoding does), because dropping
  // them would run two words together.
  [0x00a0, ' '],
  [0x2000, ' '],
  [0x2001, ' '],
  [0x2002, ' '],
  [0x2003, ' '],
  [0x2004, ' '],
  [0x2005, ' '],
  [0x2006, ' '],
  [0x2007, ' '],
  [0x2008, ' '],
  [0x2009, ' '],
  [0x200a, ' '],
  [0x202f, ' '],
  [0x205f, ' '],
  [0x3000, ' '],
  [0x0009, ' '],
  // Line and paragraph separators say what a newline says, in GSM-7.
  [0x2028, '\n'],
  [0x2029, '\n'],
  // Characters with no width at all. The backend rejects the whole body over
  // any of U+200B–U+200D, U+2060 and U+FEFF (`text_codes.rb`
  // FORBIDDEN_CHARACTERS), so removing them is the only way to a sendable
  // message — a zero-width joiner holding an emoji sequence together included.
  [0x200b, ''],
  [0x200c, ''],
  [0x200d, ''],
  [0x2060, ''],
  [0xfeff, ''],
  [0x00ad, ''],
];

const GSM7_EQUIVALENTS: Record<string, string> = Object.fromEntries(
  GSM7_EQUIVALENT_CODE_POINTS.map(([codePoint, replacement]) => [
    character(codePoint),
    replacement,
  ]),
);

const CONTROL_PATTERN =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0008\u000b\u000e-\u001f\u007f-\u009f]/;

const equivalentOf = (char: string): string | null =>
  GSM7_EQUIVALENTS[char] ?? (CONTROL_PATTERN.test(char) ? '' : null);

const isGsm7Character = (char: string): boolean =>
  GSM7_BASIC_SET.has(char) || GSM7_EXTENDED_SET.has(char);

export const findNonGsm7Characters = (body: string): NonGsm7Character[] =>
  Array.from(new Set(Array.from(normalize(body))))
    .filter((char) => !isGsm7Character(char))
    .map((char) => ({
      character: char,
      replacement: equivalentOf(char),
    }));

export const replaceWithGsm7Equivalents = (body: string): string =>
  Array.from(normalize(body))
    .map((char) => equivalentOf(char) ?? char)
    .join('');
