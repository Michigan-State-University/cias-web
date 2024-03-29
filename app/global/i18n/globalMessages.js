import { defineMessages } from 'react-intl';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  variableNamePlaceholder: {
    id: `${scope}.variableNamePlaceholder`,
    defaultMessage: 'Variable name...',
  },
  variableScorePlaceholder: {
    id: `${scope}.variableScorePlaceholder`,
    defaultMessage: 'Score',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: 'Email',
  },
  value: {
    id: `${scope}.value`,
    defaultMessage: 'Value:',
  },
  emptyValue: {
    id: `${scope}.emptyValue`,
    defaultMessage: 'No assigned value',
  },
  emptyVariable: {
    id: `${scope}.emptyVariable`,
    defaultMessage: 'No assigned variable',
  },
  hfhValuePlaceholder: {
    id: `${scope}.hfhValuePlaceholder`,
    defaultMessage: 'Value to send to HFH',
  },
  allInterventions: {
    id: `${scope}.allInterventions`,
    defaultMessage: `All interventions`,
  },
  createInterventionError: {
    id: `${scope}.createInterventionError`,
    defaultMessage: `Couldn't create an intervention`,
  },
  editInterventionError: {
    id: `${scope}.editInterventionError`,
    defaultMessage: `Couldn't edit an intervention`,
  },
  archiveInterventionError: {
    id: `${scope}.archiveInterventionError`,
    defaultMessage: `Couldn't archive an intervention`,
  },
  unknownRequestError: {
    id: `${scope}.errors.unknownRequestError`,
    defaultMessage: `Some error occurred. Please try again or contact a support.`,
  },
  questionRequired: {
    id: `${scope}.questionRequired`,
    defaultMessage: `Required fields are marked with an asterisk<span style='color:#D2371D;'>*</span>`,
  },
  dragHandle: {
    id: `${scope}.dragHandle`,
    defaultMessage: `Hold and drag to change position`,
  },
  CatMhSessionInvalid: {
    id: `${scope}.CatMhSessionInvalid`,
    defaultMessage: `Every CAT-MH™ session needs to have all values set up.`,
  },
  CatMhWrongSettings: {
    id: `${scope}.CatMhWrongSettings`,
    defaultMessage: `CAT-MH™ license settings need to be properly set up. Please contact an Admin in that matter.`,
  },
  'SmsPlan::Normal': {
    id: `${scope}.'SmsPlan::Normal'`,
    defaultMessage: 'Normal',
  },
  'SmsPlan::Alert': {
    id: `${scope}.'SmsPlan::Alert'`,
    defaultMessage: 'Alert',
  },
  defaultTlfbGroupName: {
    id: `${scope}.defaultTlfbGroupName`,
    defaultMessage: 'TLFB Group',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  confirm: {
    id: `${scope}.confirm`,
    defaultMessage: 'Confirm',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  lastCsvDate: {
    id: `${scope}.lastCsvDate`,
    defaultMessage: 'CSV last generated at: ',
  },
  dontShowAgain: {
    id: `${scope}.dontShowAgain`,
    defaultMessage: `Don't show again`,
  },
  iUnderstand: {
    id: `${scope}.iUnderstand`,
    defaultMessage: 'I understand',
  },
  areYouSure: {
    id: `${scope}.areYouSure`,
    defaultMessage: 'Are you sure?',
  },
  back: {
    id: `${scope}.back`,
    defaultMessage: 'Back',
  },
  enterTextHere: {
    id: `${scope}.enterTextHere`,
    defaultMessage: 'Enter text here',
  },
  enterTextHereRichText: {
    id: `${scope}.enterTextHereRichText`,
    defaultMessage: 'Enter text here (rich text)',
  },
  dataClearedInfo: {
    id: `${scope}.dataClearedInfo`,
    defaultMessage:
      'All sensitive data associated with this intervention has been removed, this includes user answers and generated report files.',
  },
  requiredFields: {
    id: `${scope}.requiredFields`,
    defaultMessage: `Fields with an asterisk<warningColor>*</warningColor> are required`,
  },
});
