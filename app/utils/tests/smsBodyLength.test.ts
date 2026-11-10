import {
  SmsCampaignLink,
  SmsCampaignLinkType,
  SmsCampaignMeta,
} from 'models/SmsCampaign';

import contract from './fixtures/smsBodyLengthContract.json';

import {
  SmsEncoding,
  buildResolvedSmsBody,
  calculateSmsBodyLength,
} from '../smsBodyLength';

// Values returned by GET .../sms_campaigns/meta.
const meta: SmsCampaignMeta = {
  personalLinkExpectedLength: 34,
  trackedLinkExpectedLength: 36,
  gsm7SegmentLengths: [160, 153],
  ucs2SegmentLengths: [70, 67],
  maxBodyLength: 1600,
  maxSegments: 24,
  maxReminderDaysAfter: 60,
};

const websiteLink = (variable: string) => ({
  url: 'https://example.org',
  variable,
  linkType: SmsCampaignLinkType.WEBSITE,
});

describe('buildResolvedSmsBody', () => {
  it('appends the personal link on a new line', () => {
    expect(buildResolvedSmsBody('Hello', [], meta)).toEqual(
      `Hello\n${'x'.repeat(34)}`,
    );
  });

  it('replaces a variable that has a link with a tracked-link placeholder', () => {
    const resolved = buildResolvedSmsBody(
      'See ::info:: now',
      [websiteLink('info')],
      meta,
    );

    expect(resolved).toEqual(`See ${'x'.repeat(36)} now\n${'x'.repeat(34)}`);
  });

  it('leaves a variable without a link untouched', () => {
    const resolved = buildResolvedSmsBody('See ::info::', [], meta);

    expect(resolved).toEqual(`See ::info::\n${'x'.repeat(34)}`);
  });

  it('replaces every occurrence of a linked variable', () => {
    const resolved = buildResolvedSmsBody(
      '::a:: and ::a::',
      [websiteLink('a')],
      meta,
    );

    expect(resolved).toEqual(
      `${'x'.repeat(36)} and ${'x'.repeat(36)}\n${'x'.repeat(34)}`,
    );
  });
});

describe('encoding detection', () => {
  const encodingOf = (body: string) =>
    calculateSmsBodyLength(body, [], meta).encoding;

  it('treats plain latin text as GSM-7', () => {
    expect(encodingOf('Hello, world! 123')).toEqual(SmsEncoding.GSM7);
  });

  it('treats the GSM-7 extended characters as GSM-7', () => {
    expect(encodingOf('{price} = 10€')).toEqual(SmsEncoding.GSM7);
  });

  it('falls back to UCS-2 for a character outside the GSM-7 set', () => {
    expect(encodingOf('Zażółć')).toEqual(SmsEncoding.UCS2);
  });

  it('falls back to UCS-2 for an emoji', () => {
    expect(encodingOf('Hi 🙂')).toEqual(SmsEncoding.UCS2);
  });
});

describe('calculateSmsBodyLength', () => {
  it('counts the personal link into the length', () => {
    // 'Hello' + '\n' + 34
    expect(calculateSmsBodyLength('Hello', [], meta).length).toEqual(40);
  });

  it('counts a tracked link at its expected length', () => {
    // 'See ' (4) + 36 + '\n' + 34
    expect(
      calculateSmsBodyLength('See ::info::', [websiteLink('info')], meta)
        .length,
    ).toEqual(75);
  });

  it('fits exactly one GSM-7 segment at 160 units', () => {
    // body + '\n' + 34 === 160  =>  body length 125
    const result = calculateSmsBodyLength('a'.repeat(125), [], meta);

    expect(result.length).toEqual(160);
    expect(result.segments).toEqual(1);
    expect(result.encoding).toEqual(SmsEncoding.GSM7);
  });

  it('splits into 153-unit segments once past 160 units', () => {
    const result = calculateSmsBodyLength('a'.repeat(126), [], meta);

    expect(result.length).toEqual(161);
    expect(result.segments).toEqual(Math.ceil(161 / 153));
  });

  it('counts an extended GSM-7 character as two units', () => {
    // 124 plain + 1 extended = 125 chars, 126 units, + '\n' + 34 = 161 units
    const result = calculateSmsBodyLength(`${'a'.repeat(124)}€`, [], meta);

    expect(result.length).toEqual(160);
    expect(result.segments).toEqual(2);
  });

  it('fits exactly one UCS-2 segment at 70 units', () => {
    // body + '\n' + 34 === 70  =>  body length 35, one of them non-GSM-7
    const result = calculateSmsBodyLength(`ż${'a'.repeat(34)}`, [], meta);

    expect(result.length).toEqual(70);
    expect(result.encoding).toEqual(SmsEncoding.UCS2);
    expect(result.segments).toEqual(1);
  });

  it('splits into 67-unit segments once past 70 UCS-2 units', () => {
    const result = calculateSmsBodyLength(`ż${'a'.repeat(35)}`, [], meta);

    expect(result.length).toEqual(71);
    expect(result.segments).toEqual(Math.ceil(71 / 67));
  });

  it('flags a body over maxBodyLength', () => {
    const result = calculateSmsBodyLength('a'.repeat(1566), [], meta);

    expect(result.length).toEqual(1601);
    expect(result.lengthExceeded).toBe(true);
  });

  it('does not flag a body exactly at maxBodyLength', () => {
    const result = calculateSmsBodyLength('a'.repeat(1565), [], meta);

    expect(result.length).toEqual(1600);
    expect(result.lengthExceeded).toBe(false);
  });

  it('never reaches maxSegments while within maxBodyLength', () => {
    // The worst case is all-extended GSM-7 text, where every character costs
    // two units: 1600 units => 3165 units => 21 segments, still under 24.
    // Verified against the live API: a 1565-char '€' body passes body
    // validation, a 1566-char one fails with BODY_TOO_LONG, never with
    // BODY_TOO_MANY_SEGMENTS. The segment cap only bites if the backend
    // raises max_body_length.
    const result = calculateSmsBodyLength('€'.repeat(1565), [], meta);

    expect(result.length).toEqual(1600);
    expect(result.lengthExceeded).toBe(false);
    expect(result.segments).toEqual(21);
    expect(result.segmentsExceeded).toBe(false);
  });

  it('flags too many segments when the limits allow it', () => {
    const generousMeta = { ...meta, maxBodyLength: 10000, maxSegments: 24 };
    const result = calculateSmsBodyLength('a'.repeat(4000), [], generousMeta);

    expect(result.segments).toBeGreaterThan(24);
    expect(result.segmentsExceeded).toBe(true);
  });

  it('reports no segments for an empty body with no personal link length', () => {
    const emptyMeta = { ...meta, personalLinkExpectedLength: 0 };
    const result = calculateSmsBodyLength('', [], emptyMeta);

    // Only the newline the backend adds remains.
    expect(result.length).toEqual(1);
    expect(result.segments).toEqual(1);
  });
});

/**
 * Shared contract with the backend. `cias-api` asserts against this very file
 * (spec/fixtures/sms_campaigns/body_length_contract.json) in
 * body_length_spec.rb, so the two counters cannot drift apart unnoticed: the
 * backend rejects a body with BODY_TOO_LONG / BODY_TOO_MANY_SEGMENTS, and a
 * counter that disagrees tells the researcher "it fits" right before the API
 * refuses it.
 *
 * Regenerate (in cias-api, then copy the file here):
 *   bundle exec rake sms_campaigns:dump_body_length_contract
 */
type ContractCase = {
  note: string;
  body: string;
  variables: string[];
  length: number;
  segments: number;
  gsm7: boolean;
  codes: string[];
};

describe('shared counter contract with cias-api', () => {
  const contractMeta: SmsCampaignMeta = {
    ...contract.meta,
    gsm7SegmentLengths: contract.meta.gsm7SegmentLengths as [number, number],
    ucs2SegmentLengths: contract.meta.ucs2SegmentLengths as [number, number],
  };
  const contractCases = contract.cases as ContractCase[];

  it('uses the same limits as the backend', () => {
    expect(contractMeta.maxBodyLength).toEqual(1600);
    expect(contractMeta.maxSegments).toEqual(24);
  });

  it.each(contractCases.map((row, index) => [index, row.note, row] as const))(
    'case %i: %s',
    (_index, _note, row) => {
      const links: SmsCampaignLink[] = row.variables.map((variable) => ({
        url: `${contract.webUrl}/anything`,
        variable,
        linkType: SmsCampaignLinkType.WEBSITE,
      }));

      const result = calculateSmsBodyLength(row.body, links, contractMeta);

      expect(result.length).toEqual(row.length);
      expect(result.segments).toEqual(row.segments);
      expect(result.encoding).toEqual(
        row.gsm7 ? SmsEncoding.GSM7 : SmsEncoding.UCS2,
      );
      expect(result.lengthExceeded).toBe(row.codes.includes('BODY_TOO_LONG'));
      expect(result.segmentsExceeded).toBe(
        row.codes.includes('BODY_TOO_MANY_SEGMENTS'),
      );
    },
  );
});
