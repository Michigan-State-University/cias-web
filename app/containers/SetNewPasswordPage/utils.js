import dayjs from 'dayjs';

export const shouldRedirectToLogin = ({
  'access-token': accessToken,
  client_id: clientId,
  client,
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
