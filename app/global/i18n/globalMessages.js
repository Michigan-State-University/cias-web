import { defineMessages } from 'react-intl';

export const scope = 'app.GlobalMessages';

export default defineMessages({
  variables: {
    variableNamePlaceholder: {
      id: `${scope}.variableNamePlaceholder`,
      defaultMessage: 'Variable name...',
    },
    variableScorePlaceholder: {
      id: `${scope}.variableScorePlaceholder`,
      defaultMessage: 'Score value...',
    },
    value: {
      id: `${scope}.value`,
      defaultMessage: 'Value:',
    },
    emptyBadge: {
      id: `${scope}.emptyBadge`,
      defaultMessage: 'No assigned value',
    },
  },
  blockTypes: {
    BodyAnimation: {
      id: `${scope}.BodyAnimation`,
      defaultMessage: 'Body Animation',
    },
    Speech: {
      id: `${scope}.Speech`,
      defaultMessage: 'Speech',
    },
    HeadAnimation: {
      id: `${scope}.HeadAnimation`,
      defaultMessage: 'Head Animation',
    },
  },
  questionTypes: {
    'Question::Single': {
      id: `${scope}.Question::Single`,
      defaultMessage: 'Single answer question',
    },
    'Question::Multiple': {
      id: `${scope}.Question::Multiple`,
      defaultMessage: 'Multi answer question',
    },
    'Question::TextBox': {
      id: `${scope}.Question::TextBox`,
      defaultMessage: 'Textbox question',
    },
    'Question::Number': {
      id: `${scope}.Question::Number`,
      defaultMessage: 'Number question',
    },
    'Question::Grid': {
      id: `${scope}.Question::Grid`,
      defaultMessage: 'Grid question',
    },
    'Question::AnalogueScale': {
      id: `${scope}.Question::AnalogueScale`,
      defaultMessage: 'Visual Analogue Scale Question',
    },
    'Question::Information': {
      id: `${scope}.Question::Information`,
      defaultMessage: 'Information Question',
    },
    'Question::Url': {
      id: `${scope}.Question::Url`,
      defaultMessage: 'Url Question',
    },
  },
});
