import { defineMessages } from 'react-intl';

import { QuestionTypes } from 'models/Question';

export const scope = 'app.global.QuestionTypes';

export default defineMessages<QuestionTypes>({
  [QuestionTypes.SINGLE]: {
    id: `${scope}.Question::Single`,
    defaultMessage: 'Single answer',
  },
  [QuestionTypes.MULTIPLE]: {
    id: `${scope}.Question::Multiple`,
    defaultMessage: 'Multi answer',
  },
  [QuestionTypes.FREE_RESPONSE]: {
    id: `${scope}.Question::FreeResponse`,
    defaultMessage: 'Free Response',
  },
  [QuestionTypes.PHONE]: {
    id: `${scope}.Question::Phone`,
    defaultMessage: 'Phone Text Messaging',
  },
  [QuestionTypes.NAME]: {
    id: `${scope}.Question::Name`,
    defaultMessage: 'Name',
  },
  [QuestionTypes.PARTICIPANT_REPORT]: {
    id: `${scope}.Question::ParticipantReport`,
    defaultMessage: 'Participant Report',
  },
  [QuestionTypes.NUMBER]: {
    id: `${scope}.Question::Number`,
    defaultMessage: 'Number',
  },
  [QuestionTypes.GRID]: {
    id: `${scope}.Question::Grid`,
    defaultMessage: 'Grid',
  },
  [QuestionTypes.SLIDER]: {
    id: `${scope}.Question::Slider`,
    defaultMessage: 'Slider',
  },
  [QuestionTypes.INFORMATION]: {
    id: `${scope}.Question::Information`,
    defaultMessage: 'Information Only',
  },
  [QuestionTypes.EXTERNAL_LINK]: {
    id: `${scope}.Question::ExternalLink`,
    defaultMessage: 'External Link',
  },
  [QuestionTypes.FEEDBACK]: {
    id: `${scope}.Question::Feedback`,
    defaultMessage: 'Feedback',
  },
  [QuestionTypes.FINISH]: {
    id: `${scope}.Question::Finish`,
    defaultMessage: 'Finish',
  },
  [QuestionTypes.DATE]: {
    id: `${scope}.Question::Date`,
    defaultMessage: 'Date',
  },
  [QuestionTypes.CURRENCY]: {
    id: `${scope}.Question::Currency`,
    defaultMessage: 'Currency',
  },
  [QuestionTypes.THIRD_PARTY]: {
    id: `${scope}.Question::ThirdParty`,
    defaultMessage: 'Third Party Report',
  },
  [QuestionTypes.TLFB_CONFIG]: {
    id: `${scope}.Question::TlfbConfig`,
    defaultMessage: 'TLFB Config',
  },
  [QuestionTypes.TLFB_EVENTS]: {
    id: `${scope}.Question::TlfbEvents`,
    defaultMessage: 'TLFB Events',
  },
  [QuestionTypes.TLFB_QUESTION]: {
    id: `${scope}.Question::TlfbQuestion`,
    defaultMessage: 'TLFB Questions',
  },
  [QuestionTypes.HENRY_FORD_QUESTION]: {
    id: `${scope}.Question::HenryFord`,
    defaultMessage: 'Henry Ford Question',
  },
  [QuestionTypes.HENRY_FORD_INITIAL]: {
    id: `${scope}.Question::HenryFordInitial`,
    defaultMessage: 'Henry Ford Initial Screen',
  },
});
