import { defineMessages } from 'react-intl';

import { themeColors } from 'theme';
import {
  tlfbConfig,
  tlfbEvents,
  tlfbQuestion,
} from 'models/Session/QuestionTypes';
import { UserSessionStatus } from 'models/UserSession/StatusTypes';
import { TextMessageType } from 'models/TextMessage';
import { PhoneType, Sex } from 'models/HfhsPatient';

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
    id: `${scope}.emptyBadge`,
    defaultMessage: 'No assigned value',
  },
  emptyVariable: {
    id: `${scope}.emptyBadge`,
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
  userSessionStatus: {
    [UserSessionStatus.READY_TO_START]: {
      id: `${scope}.${[UserSessionStatus.READY_TO_START]}`,
      defaultMessage: 'Ready to start',
    },
    [UserSessionStatus.IN_PROGRESS]: {
      id: `${scope}.${[UserSessionStatus.IN_PROGRESS]}`,
      defaultMessage: 'In progress',
    },
    [UserSessionStatus.COMPLETED]: {
      id: `${scope}.${[UserSessionStatus.COMPLETED]}`,
      defaultMessage: 'Completed',
    },
    [UserSessionStatus.NOT_AVAILABLE]: {
      id: `${scope}.${[UserSessionStatus.NOT_AVAILABLE]}`,
      defaultMessage: 'Not available',
    },
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
  errors: {
    unknownRequestError: {
      id: `${scope}.errors.unknownRequestError`,
      defaultMessage: `Some error occurred. Please try again or contact a support.`,
    },
  },
  animationSettings: {
    voice: {
      id: `${scope}.voice`,
      defaultMessage: 'Voice',
    },
    animation: {
      id: `${scope}.animation`,
      defaultMessage: 'Display Narrator',
    },
  },
  validators: {
    email: {
      id: `${scope}.email`,
      defaultMessage: 'Email has invalid format',
    },
    required: {
      id: `${scope}.required`,
      defaultMessage: 'This field is required',
    },
    numeric: {
      id: `${scope}.numeric`,
      defaultMessage: 'Only numeric values are allowed',
    },
    naturalNumber: {
      id: `${scope}.naturalNumber`,
      defaultMessage: 'Only natural number values are allowed',
    },
    nonNegativeInteger: {
      id: `${scope}.nonNegativeInteger`,
      defaultMessage: 'Non-negative integer value is required',
    },
    unreservedURLCharacters: {
      id: `${scope}.unreservedURLCharacters`,
      defaultMessage:
        'This field can contain letters, numbers, hyphens [-], underscores [_], periods [.], and tildes [~] only',
    },
    zipCode: {
      id: `${scope}.zipCode`,
      defaultMessage: "ZIP Code's format is incorrect",
    },
    name: {
      id: `${scope}.name`,
      defaultMessage:
        'This field can contain letters, hyphens [-], quotes [\'] ["] [`] and spaces [ ] only',
    },
  },
  questionRequired: {
    id: `${scope}.questionRequired`,
    defaultMessage: `Required fields are marked with an asterisk<span style='color:${themeColors.warning};'>*</span>`,
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
  [TextMessageType.NORMAL]: {
    id: `${scope}.${TextMessageType.NORMAL}`,
    defaultMessage: 'Normal',
  },
  [TextMessageType.ALERT]: {
    id: `${scope}.${TextMessageType.ALERT}`,
    defaultMessage: 'Alert',
  },
  defaultTlfbGroupName: {
    id: `${scope}.defaultTlfbGroupName`,
    defaultMessage: 'TLFB Group',
  },
  defaultTlfbTitles: {
    [tlfbConfig.id]: {
      id: `${scope}.${tlfbConfig.id}`,
      defaultMessage: 'Config',
    },
    [tlfbEvents.id]: {
      id: `${scope}.${tlfbEvents.id}`,
      defaultMessage: 'Events',
    },
    [tlfbQuestion.id]: {
      id: `${scope}.${tlfbQuestion.id}`,
      defaultMessage: 'Questions',
    },
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
  sex: {
    [Sex.AMBIGUOUS]: {
      id: `${scope}.${Sex.AMBIGUOUS}`,
      defaultMessage: 'Ambiguous',
    },
    [Sex.MALE]: {
      id: `${scope}.${Sex.MALE}`,
      defaultMessage: 'Male',
    },
    [Sex.FEMALE]: {
      id: `${scope}.${Sex.FEMALE}`,
      defaultMessage: 'Female',
    },
    [Sex.NOT_APPLICABLE]: {
      id: `${scope}.${Sex.NOT_APPLICABLE}`,
      defaultMessage: 'Not applicable',
    },
    [Sex.OTHER]: {
      id: `${scope}.${Sex.OTHER}`,
      defaultMessage: 'Other',
    },
    [Sex.UNKNOWN]: {
      id: `${scope}.${Sex.UNKNOWN}`,
      defaultMessage: 'Unknown',
    },
  },
  phoneType: {
    [PhoneType.HOME]: {
      id: `${scope}.${PhoneType.HOME}`,
      defaultMessage: 'Home',
    },
    [PhoneType.WORK]: {
      id: `${scope}.${PhoneType.WORK}`,
      defaultMessage: 'Work',
    },
    [PhoneType.MOBILE]: {
      id: `${scope}.${PhoneType.MOBILE}`,
      defaultMessage: 'Mobile',
    },
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
