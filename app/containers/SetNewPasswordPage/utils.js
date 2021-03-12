import dayjs from 'dayjs';

export const shouldRedirectToLogin = ({
  'Access-Token': accessToken,
  client_id: clientId,
  Client: client,
  config,
  expiry,
  reset_password: resetPassword,
  token,
  uid,
}) =>
  !accessToken ||
  !clientId ||
  !client ||
  !config ||
  !resetPassword ||
  !token ||
  !uid ||
  dayjs().isAfter(dayjs.unix(Number(expiry)));
