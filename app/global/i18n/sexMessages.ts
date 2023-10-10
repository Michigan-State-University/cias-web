import { defineMessages } from 'react-intl';

import { Sex } from 'models/HfhsPatient';

export const scope = 'app.global.Sex';

export default defineMessages<Sex>({
  [Sex.AMBIGUOUS]: {
    id: `${scope}.A`,
    defaultMessage: 'Ambiguous',
  },
  [Sex.MALE]: {
    id: `${scope}.M`,
    defaultMessage: 'Male',
  },
  [Sex.FEMALE]: {
    id: `${scope}.F`,
    defaultMessage: 'Female',
  },
  [Sex.NOT_APPLICABLE]: {
    id: `${scope}.n`,
    defaultMessage: 'Not applicable',
  },
  [Sex.OTHER]: {
    id: `${scope}.O`,
    defaultMessage: 'Other',
  },
  [Sex.UNKNOWN]: {
    id: `${scope}.U`,
    defaultMessage: 'Unknown',
  },
});
