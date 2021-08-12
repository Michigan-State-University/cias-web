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
} from 'models/Session/QuestionTypes';
import { Roles } from 'models/User/UserRoles';
import { archived, closed, draft, published } from 'models/Status/StatusTypes';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  roles: {
    [Roles.admin]: {
      id: `${scope}.${Roles.admin}`,
      defaultMessage: 'Admin',
    },
    [Roles.teamAdmin]: {
      id: `${scope}.${Roles.teamAdmin}`,
      defaultMessage: 'Team Admin',
    },
    [Roles.participant]: {
      id: `${scope}.${Roles.participant}`,
      defaultMessage: 'Participant',
    },
    [Roles.researcher]: {
      id: `${scope}.${Roles.researcher}`,
      defaultMessage: 'Researcher',
    },
    [Roles.guest]: {
      id: `${scope}.${Roles.guest}`,
      defaultMessage: 'Guest',
    },
    [Roles.thirdParty]: {
      id: `${scope}.${Roles.thirdParty}`,
      defaultMessage: 'Third Party',
    },
    [Roles.eInterventionAdmin]: {
      id: `${scope}.${Roles.eInterventionAdmin}`,
      defaultMessage: 'E-Intervention Admin',
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
    'Question::FollowUpContact': {
      id: `${scope}.Question::FollowUpContact`,
      defaultMessage: 'FollowUpContact',
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
  },
  questionRequired: {
    id: `${scope}.questionRequired`,
    defaultMessage: `Required fields are marked with an asterisk<span style='color:${themeColors.warning};'>*</span>`,
  },
  dragHandle: {
    id: `${scope}.dragHandle`,
    defaultMessage: `Hold and drag to change position`,
  },
});
