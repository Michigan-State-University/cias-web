/*
 * QuestionTypeChooser Messages
 *
 * This contains all the text for the QuestionTypeChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionTypeChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Choose type of screen',
  },
  addScreen: {
    id: `${scope}.addScreen`,
    defaultMessage: '+ Add new screen',
  },
  createsGroup: {
    id: `${scope}.createsGroup`,
    defaultMessage: 'Creates group',
  },
});
