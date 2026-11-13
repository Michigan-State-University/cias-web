import {
  getApiErrorCodes,
  getApiErrorCodesForDisplay,
  getApiErrorReason,
  getApiRetryAfter,
} from '../apiErrorCodes';

/** Shapes copied from real responses of the local API. */
const validationError = {
  response: {
    status: 422,
    data: {
      message: 'The SMS campaign is invalid',
      details: {
        errors: [
          { code: 'UNKNOWN_LINK_VARIABLE' },
          { code: 'INVALID_DAYS_AFTER' },
          { code: 'SCHEDULED_REMINDER_BODY_BLANK' },
        ],
      },
    },
  },
};

const notPublishedError = {
  response: {
    status: 400,
    data: {
      message: 'The intervention is not published',
      details: { reason: 'INTERVENTION_DRAFT' },
    },
  },
};

describe('getApiErrorCodes', () => {
  it('returns every code of a multi-code response', () => {
    expect(getApiErrorCodes(validationError)).toEqual([
      'UNKNOWN_LINK_VARIABLE',
      'INVALID_DAYS_AFTER',
      'SCHEDULED_REMINDER_BODY_BLANK',
    ]);
  });

  it('returns an empty list when there are no error details', () => {
    expect(getApiErrorCodes(notPublishedError)).toEqual([]);
    expect(getApiErrorCodes(new Error('network'))).toEqual([]);
    expect(getApiErrorCodes(undefined)).toEqual([]);
  });

  it('ignores entries without a string code', () => {
    const error = {
      response: {
        data: { details: { errors: [{}, { code: 7 }, { code: 'OK' }] } },
      },
    };
    expect(getApiErrorCodes(error)).toEqual(['OK']);
  });
});

describe('getApiErrorReason', () => {
  it('reads details.reason', () => {
    expect(getApiErrorReason(notPublishedError)).toEqual('INTERVENTION_DRAFT');
  });

  it('is null when the response carries codes instead', () => {
    expect(getApiErrorReason(validationError)).toBeNull();
  });
});

describe('getApiRetryAfter', () => {
  it('prefers details.retry_after', () => {
    const error = {
      response: {
        status: 429,
        data: {
          details: { errors: [{ code: 'RESEND_TOO_SOON' }], retry_after: 1800 },
        },
        headers: { 'retry-after': '60' },
      },
    };
    expect(getApiRetryAfter(error)).toEqual(1800);
  });

  it('falls back to the Retry-After header', () => {
    const error = {
      response: {
        status: 429,
        data: { details: { errors: [{ code: 'RATE_LIMITED' }] } },
        headers: { 'retry-after': '90' },
      },
    };
    expect(getApiRetryAfter(error)).toEqual(90);
  });

  it('is null when neither is present or usable', () => {
    expect(getApiRetryAfter(validationError)).toBeNull();
    expect(
      getApiRetryAfter({ response: { headers: { 'retry-after': 'soon' } } }),
    ).toBeNull();
  });
});

describe('getApiErrorCodesForDisplay', () => {
  it('passes the real codes through unchanged', () => {
    expect(getApiErrorCodesForDisplay(validationError)).toEqual(
      getApiErrorCodes(validationError),
    );
  });

  it('synthesises a code from details.reason', () => {
    expect(getApiErrorCodesForDisplay(notPublishedError)).toEqual([
      'NOT_PUBLISHED',
    ]);
  });

  it('does not read a reason on a status other than 400', () => {
    const serverError = {
      response: { status: 500, data: { details: { reason: 'whatever' } } },
    };
    expect(getApiErrorCodesForDisplay(serverError)).toEqual(['HTTP_500']);
  });

  it('synthesises a code for a body-less 403 so the UI is never silent', () => {
    expect(getApiErrorCodesForDisplay({ response: { status: 403 } })).toEqual([
      'HTTP_403',
    ]);
  });

  it('synthesises a network code when there is no response at all', () => {
    expect(getApiErrorCodesForDisplay(new Error('timeout'))).toEqual([
      'NETWORK_ERROR',
    ]);
  });
});
