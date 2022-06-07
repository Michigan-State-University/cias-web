import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
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

  const cable = useRef<Nullable<Cable>>(null);

  useEffect(() => {
    if (user) {
      cable.current = createCable(
        `${process.env.WEBSOCKET_URL}?access_token=${URIEncodedHeaders['Access-Token']}&uid=${URIEncodedHeaders.Uid}&client=${URIEncodedHeaders.Client}`,
        { tokenRefresher: fetchTokenFromHTML() },
      );
    } else {
      cable.current = null;
    }

    return () => {
      if (cable.current) {
        cable.current.disconnect();
      }
    };
  }, [user]);

  return (
    <SocketContext.Provider value={cable.current}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
