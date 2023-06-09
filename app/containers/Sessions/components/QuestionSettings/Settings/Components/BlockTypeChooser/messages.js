/*
 * QuestionTypeChooser Messages
 *
 * This contains all the text for the QuestionTypeChooser container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.BlockTypeChooser';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Choose type of block',
  },
  newStep: {
    id: `${scope}.newStep`,
    defaultMessage: '+ Add block',
  },
});
