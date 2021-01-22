import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditSessionPage';

export default defineMessages({
  newQuestionTitle: {
    id: `${scope}.newQuestionMessage`,
    defaultMessage: '<h1>Enter title here</h1>',
  },
  newQuestionSubtitle: {
    id: `${scope}.newQuestionSubtitle`,
    defaultMessage: 'Enter main text/question for screen here',
  },
  manageSlides: {
    id: `${scope}.manageSlides`,
    defaultMessage: 'Manage slides',
  },
  duplicate: {
    id: `${scope}.duplicate`,
    defaultMessage: 'Duplicate',
  },
  shareCopy: {
    id: `${scope}.shareCopy`,
    defaultMessage: 'Share copy',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  group: {
    id: `${scope}.group`,
    defaultMessage: 'Group',
  },
  modalTitle: {
    id: `${scope}.modalTitle`,
    defaultMessage: 'Send copy to researchers',
  },

  errors: {
    duplicateVariable: {
      id: `${scope}.duplicateVariable`,
      defaultMessage: 'This variable name is already in use!',
    },
    copyError: {
      id: `${scope}.copyError`,
      defaultMessage: 'Cannot copy the screen!',
    },
  },
});