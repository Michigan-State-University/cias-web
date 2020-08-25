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
      defaultMessage: 'Score',
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
    Reflection: {
      id: `${scope}.Reflection`,
      defaultMessage: 'Speech',
    },
    HeadAnimation: {
      id: `${scope}.HeadAnimation`,
      defaultMessage: 'Head Animation',
    },
    ReadQuestion: {
      id: `${scope}.ReadQuestion`,
      defaultMessage: 'Read question',
    },
  },
  questionTypes: {
    'Question::Single': {
      id: `${scope}.Question::Single`,
      defaultMessage: 'Single answer screen',
    },
    'Question::Multiple': {
      id: `${scope}.Question::Multiple`,
      defaultMessage: 'Multi answer screen',
    },
    'Question::TextBox': {
      id: `${scope}.Question::TextBox`,
      defaultMessage: 'Textbox screen',
    },
    'Question::Number': {
      id: `${scope}.Question::Number`,
      defaultMessage: 'Number screen',
    },
    'Question::Grid': {
      id: `${scope}.Question::Grid`,
      defaultMessage: 'Grid screen',
    },
    'Question::AnalogueScale': {
      id: `${scope}.Question::AnalogueScale`,
      defaultMessage: 'Visual Analogue Scale screen',
    },
    'Question::Information': {
      id: `${scope}.Question::Information`,
      defaultMessage: 'Information screen',
    },
    'Question::Url': {
      id: `${scope}.Question::Url`,
      defaultMessage: 'Url screen',
    },
    'Question::FollowUpContact': {
      id: `${scope}.Question::FollowUpContact`,
      defaultMessage: 'FollowUpContact screen',
    },
  },
  statuses: {
    draft: {
      id: `${scope}.draft`,
      defaultMessage: 'Draft',
    },
    published: {
      id: `${scope}.published`,
      defaultMessage: 'Published',
    },
    closed: {
      id: `${scope}.closed`,
      defaultMessage: 'Closed',
    },
    archived: {
      id: `${scope}.archived`,
      defaultMessage: 'Archived',
    },
  },
  createProblemError: {
    id: `${scope}.createProblemError`,
    defaultMessage: `Couldn't create an intervention`,
  },
  editProblemError: {
    id: `${scope}.editProblemError`,
    defaultMessage: `Couldn't edit an intervention`,
  },
});
