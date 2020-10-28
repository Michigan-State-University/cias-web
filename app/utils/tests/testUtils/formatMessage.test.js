/**
 * Test formatMessage test utils
 */

import { formatMessage, formatMessageId } from 'utils/testUtils/formatMessage';

describe('formatMessage', () => {
  const message = { defaultMessage: 'Test message', id: 'test-id' };

  it('should return defaultMessage', () => {
    const expected = message.defaultMessage;
    const actual = formatMessage(message);

    expect(expected).toStrictEqual(actual);
  });

  it('should return message id', () => {
    const expected = message.id;
    const actual = formatMessageId(message);

    expect(expected).toStrictEqual(actual);
  });
});
