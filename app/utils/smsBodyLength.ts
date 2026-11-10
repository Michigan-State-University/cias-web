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

  const withTrackedLinks = body.replace(
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
