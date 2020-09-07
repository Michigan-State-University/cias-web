import { actionBuilder } from 'utils/actionBuilder';

import { CHANGE_CURRENT_NARRATOR_BLOCK } from './constants';

export const changeCurrentNarratorBlock = index =>
  actionBuilder(CHANGE_CURRENT_NARRATOR_BLOCK, { index });
