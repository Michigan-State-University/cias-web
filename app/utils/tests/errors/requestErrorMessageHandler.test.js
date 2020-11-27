/**
 * Test requestErrorMessageHandler
 */

import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

describe('requestErrorMessageHandler test', () => {
  it('should return error.toString() when is not axios error', () => {
    const error = new RangeError('Wrong range');
    const expected = 'RangeError: Wrong range';

    expect(requestErrorMessageHandler(error)).toEqual(expected);
  });

  it('should return unknownRequestError when axios error with unknown status', () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 1000,
        data: 'SomeError',
      },
    };
    const expected = formatMessage(globalMessages.errors.unknownRequestError);

    expect(requestErrorMessageHandler(error)).toEqual(expected);
  });

  it('should return api error when axios error with known status', () => {
    const error = {
      isAxiosError: true,
      response: {
        status: 422,
        data: { message: 'UnprocessableEntity' },
      },
    };
    const expected = 'UnprocessableEntity';

    expect(requestErrorMessageHandler(error)).toEqual(expected);
  });
});
