import { defineMessages } from 'react-intl';

import { themeColors } from 'theme';
import {
  bodyAnimationType,
  feedbackBlockType,
  headAnimationType,
  pauseType,
  readQuestionBlockType,
  reflectionFormulaType,
  reflectionType,
  speechType,
} from 'models/Narrator/BlockTypes';
import {
  feedbackQuestion,
  finishQuestion,
  gridQuestion,
  informationQuestion,
  multiQuestion,
  numberQuestion,
  singleQuestion,
  textboxQuestion,
  urlQuestion,
  visualAnalogueScaleQuestion,
  phoneQuestion,
  dateQuestion,
  nameQuestion,
  currencyQuestion,
  thirdPartyQuestion,
  participantReport,
  tlfbConfig,
  tlfbEvents,
  tlfbQuestion,
  henryFordQuestion,
  henryFordInitialScreen,
} from 'models/Session/QuestionTypes';
import { GroupType } from 'models/QuestionGroup';
import { Roles } from 'models/User/RolesManager';
import { archived, closed, draft, published } from 'models/Status/StatusTypes';
import { UserInterventionStatus } from 'models/UserIntervention/StatusTypes';
import { UserSessionStatus } from 'models/UserSession/StatusTypes';
import { TextMessageType } from 'models/TextMessage';
import { SharingFilter } from 'models/Intervention/SharingFilter';
import { PhoneType, Sex } from 'models/HfhsPatient';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  roles: {
    [Roles.Admin]: {
      id: `${scope}.${Roles.Admin}`,
      defaultMessage: 'Admin',
    },
    [Roles.TeamAdmin]: {
      id: `${scope}.${Roles.TeamAdmin}`,
      defaultMessage: 'Team Admin',
    },
    [Roles.Participant]: {
      id: `${scope}.${Roles.Participant}`,
      defaultMessage: 'Participant',
    },
    [Roles.Researcher]: {
      id: `${scope}.${Roles.Researcher}`,
      defaultMessage: 'Researcher',
    },
    [Roles.Guest]: {
      id: `${scope}.${Roles.Guest}`,
      defaultMessage: 'Guest',
    },
    [Roles.ThirdParty]: {
      id: `${scope}.${Roles.ThirdParty}`,
      defaultMessage: 'Third Party',
    },
    [Roles.EInterventionAdmin]: {
      id: `${scope}.${Roles.EInterventionAdmin}`,
      defaultMessage: 'E-Intervention Admin',
    },
    [Roles.Navigator]: {
      id: `${scope}.${Roles.Navigator}`,
      defaultMessage: 'Navigator',
    },
    [Roles.ClinicAdmin]: {
      id: `${scope}.${Roles.ClinicAdmin}`,
      defaultMessage: 'Clinic Admin',
    },
    [Roles.HealthSystemAdmin]: {
      id: `${scope}.${Roles.HealthSystemAdmin}`,
      defaultMessage: 'Health System Admin',
    },
    [Roles.OrganizationAdmin]: {
      id: `${scope}.${Roles.OrganizationAdmin}`,
      defaultMessage: 'Organization Admin',
    },
    [Roles.PredefinedParticipant]: {
      id: `${scope}.${Roles.PredefinedParticipant}`,
      defaultMessage: 'Predefined Participant',
    },
  },
  variables: {
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
  },
  blockTypes: {
    [bodyAnimationType]: {
      id: `${scope}.${bodyAnimationType}`,
      defaultMessage: 'Body Animation',
    },
    [speechType]: {
      id: `${scope}.${speechType}`,
      defaultMessage: 'Speech',
    },
    [reflectionType]: {
      id: `${scope}.${reflectionType}`,
      defaultMessage: 'Speech',
    },
    [reflectionFormulaType]: {
      id: `${scope}.${reflectionFormulaType}`,
      defaultMessage: 'Speech',
    },
    [headAnimationType]: {
      id: `${scope}.${headAnimationType}`,
      defaultMessage: 'Head Animation',
    },
    [readQuestionBlockType]: {
      id: `${scope}.${readQuestionBlockType}`,
      defaultMessage: 'Read question',
    },
    [pauseType]: {
      id: `${scope}.${pauseType}`,
      defaultMessage: 'Pause',
    },
    [feedbackBlockType]: {
      id: `${scope}.${feedbackBlockType}`,
      defaultMessage: 'Show Spectrum',
    },
  },
  questionTypes: {
    [singleQuestion.id]: {
      id: `${scope}.${singleQuestion.id}`,
      defaultMessage: 'Single answer',
    },
    [multiQuestion.id]: {
      id: `${scope}.${multiQuestion.id}`,
      defaultMessage: 'Multi answer',
    },
    [textboxQuestion.id]: {
      id: `${scope}.${[textboxQuestion.id]}`,
      defaultMessage: 'Free Response',
    },
    [phoneQuestion.id]: {
      id: `${scope}.${phoneQuestion.id}`,
      defaultMessage: 'Phone Text Messaging',
    },
    [nameQuestion.id]: {
      id: `${scope}.${nameQuestion.id}`,
      defaultMessage: 'Name',
    },
    [participantReport.id]: {
      id: `${scope}.${participantReport.id}`,
      defaultMessage: 'Participant Report',
    },
    [numberQuestion.id]: {
      id: `${scope}.${numberQuestion.id}`,
      defaultMessage: 'Number',
    },
    [gridQuestion.id]: {
      id: `${scope}.${gridQuestion.id}`,
      defaultMessage: 'Grid',
    },
    [visualAnalogueScaleQuestion.id]: {
      id: `${scope}.${visualAnalogueScaleQuestion.id}`,
      defaultMessage: 'Slider',
    },
    [informationQuestion.id]: {
      id: `${scope}.${informationQuestion.id}`,
      defaultMessage: 'Information Only',
    },
    [urlQuestion.id]: {
      id: `${scope}.${urlQuestion.id}`,
      defaultMessage: 'External Link',
    },
    [feedbackQuestion.id]: {
      id: `${scope}.${feedbackQuestion.id}`,
      defaultMessage: 'Feedback',
    },
    [finishQuestion.id]: {
      id: `${scope}.${finishQuestion.id}`,
      defaultMessage: 'Finish',
    },
    [dateQuestion.id]: {
      id: `${scope}.${dateQuestion.id}`,
      defaultMessage: 'Date',
    },
    [currencyQuestion.id]: {
      id: `${scope}.${currencyQuestion.id}`,
      defaultMessage: 'Currency',
    },
    [thirdPartyQuestion.id]: {
      id: `${scope}.${thirdPartyQuestion.id}`,
      defaultMessage: 'Third Party Report',
    },
    [tlfbConfig.id]: {
      id: `${scope}.${tlfbConfig.id}`,
      defaultMessage: 'TLFB Config',
    },
    [tlfbEvents.id]: {
      id: `${scope}.${tlfbEvents.id}`,
      defaultMessage: 'TLFB Events',
    },
    [tlfbQuestion.id]: {
      id: `${scope}.${tlfbQuestion.id}`,
      defaultMessage: 'TLFB Questions',
    },
    [henryFordQuestion.id]: {
      id: `${scope}.${tlfbQuestion.id}`,
      defaultMessage: 'Henry Ford Question',
    },
    [henryFordInitialScreen.id]: {
      id: `${scope}.${henryFordInitialScreen.id}`,
      defaultMessage: 'Henry Ford Initial Screen',
    },
  },
  questionGroupType: {
    [GroupType.TLFB]: {
      id: `${scope}.${GroupType.TLFB}`,
      defaultMessage: 'Timeline Followback',
    },
  },
  statuses: {
    [draft]: {
      id: `${scope}.${draft}`,
      defaultMessage: 'Draft',
    },
    [published]: {
      id: `${scope}.${published}`,
      defaultMessage: 'Published',
    },
    [closed]: {
      id: `${scope}.${closed}`,
      defaultMessage: 'Closed',
    },
    [archived]: {
      id: `${scope}.${archived}`,
      defaultMessage: 'Archived',
    },
  },
  sharingFilters: {
    [SharingFilter.ONLY_SHARED_BY_ME]: {
      id: `${scope}.${SharingFilter.ONLY_SHARED_BY_ME}`,
      defaultMessage: `Shared by me`,
    },
    [SharingFilter.ONLY_SHARED_WITH_ME]: {
      id: `${scope}.${SharingFilter.ONLY_SHARED_WITH_ME}`,
      defaultMessage: `Shared with me`,
    },
    [SharingFilter.ONLY_NOT_SHARED_WITH_ANYONE]: {
      id: `${scope}.${SharingFilter.ONLY_NOT_SHARED_WITH_ANYONE}`,
      defaultMessage: `Mine only (not shared)`,
    },
  },
  allInterventions: {
    id: `${scope}.allInterventions`,
    defaultMessage: `All interventions`,
  },
  userInterventionStatus: {
    [UserInterventionStatus.READY_TO_START]: {
      id: `${scope}.${[UserInterventionStatus.READY_TO_START]}`,
      defaultMessage: 'Ready to start',
    },
    [UserInterventionStatus.IN_PROGRESS]: {
      id: `${scope}.${[UserInterventionStatus.IN_PROGRESS]}`,
      defaultMessage: 'In progress',
    },
    [UserInterventionStatus.COMPLETED]: {
      id: `${scope}.${[UserInterventionStatus.COMPLETED]}`,
      defaultMessage: 'Completed',
    },
    [UserInterventionStatus.SCHEDULE_PENDING]: {
      id: `${scope}.${[UserInterventionStatus.SCHEDULE_PENDING]}`,
      defaultMessage: 'Schedule session pending',
    },
    [UserInterventionStatus.NO_ACCESS]: {
      id: `${scope}.${[UserInterventionStatus.NO_ACCESS]}`,
      defaultMessage: 'No access',
    },
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
    defaultMessage: `Required fields are marked with an asterisk<span style="color:${themeColors.warning};">*</span>`,
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
  dataClearedInfo: {
    id: `${scope}.dataClearedInfo`,
    defaultMessage:
      'All sensitive data associated with this intervention has been removed, this includes user answers and generated report files.',
  },
});
