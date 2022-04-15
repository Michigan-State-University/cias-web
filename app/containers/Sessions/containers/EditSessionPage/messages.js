import { defineMessages } from 'react-intl';

import { participantReport } from 'models/Session/QuestionTypes';

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
    defaultMessage: 'Manage Groups',
  },
  manageScreens: {
    id: `${scope}.manageScreens`,
    defaultMessage: 'Manage Screens',
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
    defaultMessage: 'Duplicate here',
  },
  shareCopy: {
    id: `${scope}.shareCopy`,
    defaultMessage: 'Share externally',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  group: {
    id: `${scope}.group`,
    defaultMessage: 'Group',
  },
  duplicateInternally: {
    id: `${scope}.duplicateInternally`,
    defaultMessage: 'Duplicate internally',
  },
  duplicateInternallyModalTitle: {
    id: `${scope}.duplicateInternallyModalTitle`,
    defaultMessage: 'Select a place to paste',
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

  defaultQuestionSubtitles: {
    [participantReport.id]: {
      id: `${scope}.defaultQuestionSubtitles.${participantReport.id}`,
      defaultMessage:
        '<h2>Would you like to receive a report generated from your responses?</h2>',
    },
  },
});
