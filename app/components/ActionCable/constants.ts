import { CreateOptions, Protocol, ProtocolID } from '@anycable/core';

import { tokenRefresher } from './utils';

export const CABLE_CREATE_OPTIONS: Partial<
  CreateOptions<ProtocolID | Protocol>
> = {
  tokenRefresher,
};
