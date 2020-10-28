export const headersConst = {
  'Content-Type': 'application/json; charset=utf-8',
  'token-type': 'Bearer',
};

export const getHeaders = headers => ({
  ...headersConst,
  'access-token': headers.token,
  client: headers.client,
  uid: headers.uid,
});
