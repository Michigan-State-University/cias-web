export const getHeaders = headers => ({
  'Content-type': 'application/json; charset=utf-8',
  'access-token': headers.token,
  'token-type': 'Bearer',
  client: headers.client,
  uid: headers.uid,
});
