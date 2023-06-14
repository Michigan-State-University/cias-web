import React, { PropsWithChildren } from 'react';

import {
  useInterventionChannel,
  InterventionChannelContext,
} from 'utils/useInterventionChannel';
import { useMatchResearchersInterventionPaths } from 'utils/router';

export const InterventionChannelProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const match = useMatchResearchersInterventionPaths();

  const interventionChannel = useInterventionChannel(
    match?.params?.interventionId,
  );

  return (
    <InterventionChannelContext.Provider value={interventionChannel}>
      {children}
    </InterventionChannelContext.Provider>
  );
};
