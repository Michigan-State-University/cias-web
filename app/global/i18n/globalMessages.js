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
  general: {
    if: {
      id: `${scope}.if`,
      defaultMessage: 'If',
    },
    goTo: {
      id: `${scope}.goTo`,
      defaultMessage: 'go to',
    },
    formula: {
      id: `${scope}.formula`,
      defaultMessage: 'Formula',
    },
    nextScreen: {
      id: `${scope}.nextScreen`,
      defaultMessage: 'Next Screen',
    },
  },
});
