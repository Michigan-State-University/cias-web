import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditSessionPage';

export default defineMessages({
  newQuestionTitle: {
    id: `${scope}.newQuestionMessage`,
    defaultMessage: '<h2>Enter title here</h2>',
  },
  newQuestionSubtitle: {
    id: `${scope}.newQuestionSubtitle`,
    defaultMessage: '<p>Enter main text/question for screen here</p>',
  },
  newSmsQuestionSubtitle: {
    id: `${scope}.newSmsQuestionSubtitle`,
    defaultMessage: 'Enter SMS text here',
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
  duplicateHere: {
    id: `${scope}.duplicateHere`,
    defaultMessage: 'Duplicate here',
  },
  shareCopy: {
    id: `${scope}.shareCopy`,
    defaultMessage: 'Share externally',
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'Share',
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
  shareExternallyModalTitle: {
    id: `${scope}.shareExternallyModalTitle`,
    defaultMessage: 'Share externally',
  },
  duplicateGroup: {
    id: `${scope}.duplicateGroup`,
    defaultMessage: 'Duplicate questions to session',
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
    defaultMessage: 'CAT-MH™ Settings',
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
    defaultMessage: 'Narrator voice type',
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
  creationDate: {
    id: `${scope}.creationDate`,
    defaultMessage: 'Creation date:',
  },
});
