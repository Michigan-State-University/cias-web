import { createContext } from 'react';

import { InterventionChannel } from './useInterventionChannel';

export type InterventionChannelContextType = {} & Pick<
  InterventionChannel,
  'startEditing' | 'stopEditing'
>;

export const InterventionChannelContext =
  createContext<Nullable<InterventionChannelContextType>>(null);
