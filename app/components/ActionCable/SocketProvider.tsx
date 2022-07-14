import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createCable } from '@anycable/web';
import { Cable } from '@anycable/core';
import { useLocalStorage } from '@rehooks/local-storage';

import { HEADERS } from 'utils/localStorageService';

import { createCableUrl, getUidFromCableUrl, tokenRefresher } from './utils';

type Props = PropsWithChildren<{}>;

export const SocketContext = createContext<Nullable<Cable>>(null);

export const SocketProvider = ({ children }: Props) => {
  const [cable, setCable] = useState<Nullable<Cable>>(null);

  const [headers] = useLocalStorage<Record<string, string>>(HEADERS);

  const cableUrl = useMemo(() => createCableUrl(headers), [headers]);

  useEffect(() => {
    if (!cableUrl) {
      cable?.disconnect();
      cable?.close();
      setCable(null);
      return;
    }

    if (!cable) {
      setCable(
        createCable(cableUrl, {
          tokenRefresher,
        }),
      );
      return;
    }

    const currentUid = getUidFromCableUrl(cable.transport.url);
    const newUid = getUidFromCableUrl(cableUrl);

    if (newUid !== currentUid) {
      cable.transport.setURL(cableUrl);
    }
  }, [cableUrl]);

  return (
    <SocketContext.Provider value={cable}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
