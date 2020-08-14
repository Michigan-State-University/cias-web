import { actionBuilder } from 'utils/actionBuilder';

import { CHANGE_CURRENT_INTERVENTION } from './constants';

export const changeCurrentIntervention = index =>
  actionBuilder(CHANGE_CURRENT_INTERVENTION, { index });
