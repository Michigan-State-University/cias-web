import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { createCable, fetchTokenFromHTML } from '@anycable/web';
import { Cable } from '@anycable/core';

import { User } from 'models/User';
import LocalStorageService from 'utils/localStorageService';
import { URIEncodeObject } from 'utils/uriUtils';

type Props = PropsWithChildren<{
  user: User;
}>;

export const SocketContext = createContext<Nullable<Cable>>(null);

export const SocketProvider = ({ children, user }: Props) => {
  const headers = LocalStorageService.getHeaders();

  const URIEncodedHeaders = URIEncodeObject(headers);

  const [cable, setCable] = useState<Nullable<Cable>>(null);

  useEffect(() => {
    if (user) {
      setCable(
        createCable(
          `${process.env.WEBSOCKET_URL}?access_token=${URIEncodedHeaders['Access-Token']}&uid=${URIEncodedHeaders.Uid}&client=${URIEncodedHeaders.Client}`,
          { tokenRefresher: fetchTokenFromHTML() },
        ),
      );
    } else {
      setCable(null);
    }

    return () => {
      if (cable) {
        cable.disconnect();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={cable}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
