import React, { createContext, useEffect, useRef } from 'react';
import actionCable, { Cable } from 'actioncable';

import LocalStorageService from 'utils/localStorageService';

const ActionCableContext = createContext({} as Cable);

type Props = {
  children: React.ReactNode | Array<React.ReactNode>;
  cableInstance?: Cable;
  url: string;
};

const ActionCableProvider = ({ children, cableInstance, url }: Props) => {
  const hasMounted = useRef(false);

  const createActionCableConsumer = () => {
    const headers = LocalStorageService.getHeaders();
    return actionCable.createConsumer(
      `${url}?uid=${headers.Uid}&access_token=${
        headers['Access-Token']
      }&client=${headers.Client}`,
    );
  };

  const cable = useRef(cableInstance || createActionCableConsumer());

  useEffect(() => {
    if (hasMounted.current)
      cable.current = cableInstance || createActionCableConsumer();
    else hasMounted.current = true;

    return () => {
      if (cable.current) cable.current.disconnect();
    };
  }, [cableInstance, url]);

  return (
    <ActionCableContext.Provider value={cable.current}>
      {children}
    </ActionCableContext.Provider>
  );
};

export { ActionCableProvider, ActionCableContext };
