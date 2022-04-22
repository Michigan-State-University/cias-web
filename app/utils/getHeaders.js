export const headersConst = {
  'Content-Type': 'application/json; charset=utf-8',
  'Token-Type': 'Bearer',
};

export const getHeaders = (headers) => ({
  ...headersConst,
  'Access-Token': headers.Token,
  Client: headers.Client,
  Uid: headers.Uid,
});
