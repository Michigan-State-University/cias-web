import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { createCable, fetchTokenFromHTML } from '@anycable/web';
import { Cable } from '@anycable/core';

import LocalStorageService from 'utils/localStorageService';
import { User } from 'models/User';

type Props = PropsWithChildren<{
  user: User;
}>;

export const SocketContext = createContext<Nullable<Cable>>(null);

export const SocketProvider = ({ children, user }: Props) => {
  const headers = LocalStorageService.getHeaders();

  const apiHost = process.env.API_URL && new URL(process.env.API_URL).host;

  const cable = useRef<Nullable<Cable>>(null);

  useEffect(() => {
    if (user) {
      cable.current = createCable(
        `ws://${apiHost}/cable?access_token=${headers['Access-Token']}&uid=${headers.Uid}&client=${headers.Client}`,
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
