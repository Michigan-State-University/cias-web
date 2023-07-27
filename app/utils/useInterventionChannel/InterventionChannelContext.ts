import { createContext } from 'react';

import { InterventionChannel } from './useInterventionChannel';

export const InterventionChannelContext =
  createContext<Nullable<InterventionChannel>>(null);
