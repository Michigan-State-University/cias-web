import { CreateOptions } from '@anycable/core';

import { tokenRefresher } from './utils';

export const CABLE_CREATE_OPTIONS: Partial<CreateOptions> = {
  tokenRefresher,
};
