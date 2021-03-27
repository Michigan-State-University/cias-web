import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditSessionPage';

export default defineMessages({
  newQuestionTitle: {
    id: `${scope}.newQuestionMessage`,
    defaultMessage: 'Enter title here',
  },
  newQuestionSubtitle: {
    id: `${scope}.newQuestionSubtitle`,
    defaultMessage: '<h2>Enter main text/question for screen here</h2>',
  },
  manageSlides: {
    id: `${scope}.manageSlides`,
    defaultMessage: 'Manage screens',
  },
  expandGroups: {
    id: `${scope}.expandGroups`,
    defaultMessage: 'Expand groups',
  },
  collapseGroups: {
    id: `${scope}.collapseGroups`,
    defaultMessage: 'Collapse groups',
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
