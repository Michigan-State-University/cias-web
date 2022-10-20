import { TokenRefresher } from '@anycable/core/create-cable';

import { URIEncodeObject } from 'utils/uriUtils';
import LocalStorageService from 'utils/localStorageService';

export const createCableUrl = (
  headers: Nullable<Record<string, string>>,
): Nullable<string> => {
  if (!headers) return null;
  const { 'Access-Token': AccessToken, Uid, Client } = URIEncodeObject(headers);
  if (!AccessToken || !Uid || !Client) return null;
  return `${process.env.WEBSOCKET_URL}?access_token=${AccessToken}&uid=${Uid}&client=${Client}`;
};

export const tokenRefresher: TokenRefresher = async (transport) => {
  const url = createCableUrl(LocalStorageService.getHeaders());
  if (url) {
    transport.setURL(url);
  }
};

export const getUidFromCableUrl = (cableUrl: string) =>
  new URL(cableUrl).searchParams.get('uid');
