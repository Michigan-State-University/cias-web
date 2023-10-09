import { defineMessages } from 'react-intl';

export const scope = 'app.global.QuestionTypes';

export default defineMessages({
  'Question::Single': {
    id: `${scope}.Question::Single`,
    defaultMessage: 'Single answer',
  },
  'Question::Multiple': {
    id: `${scope}.Question::Multiple`,
    defaultMessage: 'Multi answer',
  },
  'Question::FreeResponse': {
    id: `${scope}.Question::FreeResponse`,
    defaultMessage: 'Free Response',
  },
  'Question::Phone': {
    id: `${scope}.Question::Phone`,
    defaultMessage: 'Phone Text Messaging',
  },
  'Question::Name': {
    id: `${scope}.Question::Name`,
    defaultMessage: 'Name',
  },
  'Question::ParticipantReport': {
    id: `${scope}.Question::ParticipantReport`,
    defaultMessage: 'Participant Report',
  },
  'Question::Number': {
    id: `${scope}.Question::Number`,
    defaultMessage: 'Number',
  },
  'Question::Grid': {
    id: `${scope}.Question::Grid`,
    defaultMessage: 'Grid',
  },
  'Question::Slider': {
    id: `${scope}.Question::Slider`,
    defaultMessage: 'Slider',
  },
  'Question::Information': {
    id: `${scope}.Question::Information`,
    defaultMessage: 'Information Only',
  },
  'Question::ExternalLink': {
    id: `${scope}.Question::ExternalLink`,
    defaultMessage: 'External Link',
  },
  'Question::Feedback': {
    id: `${scope}.Question::Feedback`,
    defaultMessage: 'Feedback',
  },
  'Question::Finish': {
    id: `${scope}.Question::Finish`,
    defaultMessage: 'Finish',
  },
  'Question::Date': {
    id: `${scope}.Question::Date`,
    defaultMessage: 'Date',
  },
  'Question::Currency': {
    id: `${scope}.Question::Currency`,
    defaultMessage: 'Currency',
  },
  'Question::ThirdParty': {
    id: `${scope}.Question::ThirdParty`,
    defaultMessage: 'Third Party Report',
  },
  'Question::TlfbConfig': {
    id: `${scope}.Question::TlfbConfig`,
    defaultMessage: 'TLFB Config',
  },
  'Question::TlfbEvents': {
    id: `${scope}.Question::TlfbEvents`,
    defaultMessage: 'TLFB Events',
  },
  'Question::TlfbQuestion': {
    id: `${scope}.Question::TlfbQuestion`,
    defaultMessage: 'TLFB Questions',
  },
  'Question::HenryFord': {
    id: `${scope}.Question::HenryFord`,
    defaultMessage: 'Henry Ford Question',
  },
  'Question::HenryFordInitial': {
    id: `${scope}.Question::HenryFordInitial`,
    defaultMessage: 'Henry Ford Initial Screen',
  },
});
