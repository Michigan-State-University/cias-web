import { defineMessages } from 'react-intl';

import { PhoneType } from 'models/HfhsPatient';

export const scope = 'app.global.PhoneTypes';

export default defineMessages<PhoneType>({
  [PhoneType.HOME]: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  [PhoneType.WORK]: {
    id: `${scope}.work`,
    defaultMessage: 'Work',
  },
  [PhoneType.MOBILE]: {
    id: `${scope}.mobile`,
    defaultMessage: 'Mobile',
  },
});
