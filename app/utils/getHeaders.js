import { makeSelectHeaders } from 'global/reducers/auth';

export const getHeaders = () => {
  const headers = makeSelectHeaders()();

  return {
    'Content-type': 'application/json; charset=utf-8',
    'access-token': headers.token,
    'token-type': 'Bearer',
    client: headers.client,
    uid: headers.uid,
  };
};
