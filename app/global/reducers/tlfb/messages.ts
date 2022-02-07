import { defineMessages } from 'react-intl';

export const scope = 'app.global.reducers.tlfb';

export default defineMessages({
  addTlfbEventError: {
    id: `${scope}.addTlfbEventError`,
    defaultMessage: `Couldn't add a new event`,
  },
  editTlfbEventError: {
    id: `${scope}.editTlfbEventError`,
    defaultMessage: `Couldn't edit the event name`,
  },
  deleteTlfbEventError: {
    id: `${scope}.deleteTlfbEventError`,
    defaultMessage: `Couldn't delete the event`,
  },
  addTlfbSubstanceError: {
    id: `${scope}.addTlfbSubstanceError`,
    defaultMessage: `Couldn't add a new substance`,
  },
  editTlfbSubstanceError: {
    id: `${scope}.editTlfbSubstanceError`,
    defaultMessage: `Couldn't edit the substance`,
  },
});
