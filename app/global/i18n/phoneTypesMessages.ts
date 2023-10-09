import { defineMessages } from 'react-intl';

import { PhoneType } from 'models/HfhsPatient';

export const scope = 'app.global.PhoneTypes';

export default defineMessages<PhoneType>({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  work: {
    id: `${scope}.work`,
    defaultMessage: 'Work',
  },
  mobile: {
    id: `${scope}.mobile`,
    defaultMessage: 'Mobile',
  },
});
