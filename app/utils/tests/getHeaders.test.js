/**
 * Test getHeaders
 */

import { getHeaders, headersConst } from 'utils/getHeaders';

describe('getHeaders test', () => {
  const headersObject = {
    Uid: '12345',
    Client: 'TestUser',
    Token: 'abc-123-ABC-789',
  };

  it('should return proper headers object', () => {
    const { Uid, Client, Token } = headersObject;

    const expected = {
      ...headersConst,
      'Access-Token': Token,
      Uid,
      Client,
    };
    const actual = getHeaders(headersObject);

    expect(expected).toStrictEqual(actual);
  });
});
