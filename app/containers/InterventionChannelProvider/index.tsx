import React, { PropsWithChildren } from 'react';
import { matchPath, useLocation } from 'react-router';

import {
  useInterventionChannel,
  InterventionChannelContext,
} from 'utils/useInterventionChannel';

import { INTERVENTION_CHANNEL_ROUTES } from './constants';

export const InterventionChannelProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const { pathname } = useLocation();
  const match = matchPath<{ interventionId?: string }>(pathname, {
    path: INTERVENTION_CHANNEL_ROUTES,
    exact: true,
  });

  const interventionChannel = useInterventionChannel(
    match?.params?.interventionId,
  );

  return (
    <InterventionChannelContext.Provider value={interventionChannel}>
      {children}
    </InterventionChannelContext.Provider>
  );
};
