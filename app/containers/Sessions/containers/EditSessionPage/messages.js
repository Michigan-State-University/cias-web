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
    defaultMessage: 'Manage Groups',
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
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Session: {name}',
  },
  showQuestionsBoxLabel: {
    id: `${scope}.showQuestionsBoxLabel`,
    defaultMessage: 'Hover to show Questions',
  },
  closeQuestionManagementLabel: {
    id: `${scope}.closeQuestionManagementLabel`,
    defaultMessage: 'Close Manage Groups',
  },
  generalSettings: {
    id: `${scope}.generalSettings`,
    defaultMessage: 'General settings',
  },
  sessionDetails: {
    id: `${scope}.sessionDetails`,
    defaultMessage: 'Session details',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language',
  },
  timeFrame: {
    id: `${scope}.timeFrame`,
    defaultMessage: 'Time frame',
  },
  population: {
    id: `${scope}.population`,
    defaultMessage: 'Population',
  },
  variable: {
    id: `${scope}.variable`,
    defaultMessage: 'Session variable',
  },
  narratorVoiceType: {
    id: `${scope}.narratorVoiceType`,
    defaultMessage: 'Peedy voice type',
  },
  noTestsData: {
    id: `${scope}.noTestsData`,
    defaultMessage:
      'Choose language, time frame and population to see available tests',
  },
  testsHeader: {
    id: `${scope}.testsHeader`,
    defaultMessage: 'Test types and their variables with scores',
  },
  saveChanges: {
    id: `${scope}.saveChanges`,
    defaultMessage: 'Save changes',
  },
});
