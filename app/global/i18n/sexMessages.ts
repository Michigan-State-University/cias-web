import { defineMessages } from 'react-intl';

export const scope = 'app.global.Sex';

export default defineMessages({
  A: {
    id: `${scope}.A`,
    defaultMessage: 'Ambiguous',
  },
  M: {
    id: `${scope}.M`,
    defaultMessage: 'Male',
  },
  F: {
    id: `${scope}.F`,
    defaultMessage: 'Female',
  },
  n: {
    id: `${scope}.n`,
    defaultMessage: 'Not applicable',
  },
  O: {
    id: `${scope}.O`,
    defaultMessage: 'Other',
  },
  U: {
    id: `${scope}.U`,
    defaultMessage: 'Unknown',
  },
});
