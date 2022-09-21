import { defineMessages } from 'react-intl';

export const scope =
  'app.containers.Sessions.components.MissingAnimationsModal';

export default defineMessages({
  missingAnimationsModalTitle: {
    id: `${scope}.missingAnimationsModalTitle`,
    defaultMessage: 'Missing Animations',
  },
  missingAnimationsModalTitleDescription: {
    id: `${scope}.missingAnimationsModalTitleDescription`,
    defaultMessage:
      'The new narrator does not support several animations from the previous narrator. We will replace missing animations with default animations.',
  },
  missingAnimationColumnHeader: {
    id: `${scope}.missingAnimationColumnHeader`,
    defaultMessage: 'Missing animation',
  },
  replacementAnimationColumnHeader: {
    id: `${scope}.replacementAnimationColumnHeader`,
    defaultMessage: 'Replacement',
  },
  changeNarratorButton: {
    id: `${scope}.changeNarratorButton`,
    defaultMessage: 'Change narrator',
  },
  modalIconAlt: {
    id: `${scope}.modalIconAlt`,
    defaultMessage: 'Question mark icon',
  },
});
