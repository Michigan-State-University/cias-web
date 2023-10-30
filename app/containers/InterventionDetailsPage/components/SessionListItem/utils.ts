import {
  CAT_SESSION_BDI_NAME_PREFIX,
  CAT_SESSION_NAME_PREFIX,
} from 'models/Session';

export const formatSessionName = (name: string) =>
  name.replace(CAT_SESSION_NAME_PREFIX, CAT_SESSION_BDI_NAME_PREFIX);
