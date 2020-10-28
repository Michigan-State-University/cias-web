/**
 * Test getHeaders
 */

import { getHeaders, headersConst } from 'utils/getHeaders';

describe('getHeaders test', () => {
  const headersObject = {
    uid: '12345',
    client: 'TestUser',
    token: 'abc-123-ABC-789',
  };

  it('should return proper headers object', () => {
    const { uid, client, token } = headersObject;

    const expected = {
      ...headersConst,
      'access-token': token,
      uid,
      client,
    };
    const actual = getHeaders(headersObject);

    expect(expected).toStrictEqual(actual);
  });
});
