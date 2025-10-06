import { defineMessages } from 'react-intl';

export const scope = 'app.containers.QuestionGroupSettingsModal';

export default defineMessages({
  addNewFormula: {
    id: `${scope}.addNewFormula`,
    defaultMessage: 'Add new formula',
  },
  questionsPerDay: {
    id: `${scope}.questionsPerDay`,
    defaultMessage: 'Number of messages per day',
  },
  numberOfRepetitions: {
    id: `${scope}.numberOfRepetitions`,
    defaultMessage: 'Number of repetitions',
  },
  dayOfPeriod: {
    id: `${scope}.dayOfPeriod`,
    defaultMessage: 'Day of Message',
  },
  time: {
    id: `${scope}.time`,
    defaultMessage: 'Time of the Message',
  },
  timeSpecified: {
    id: `${scope}.timeSpecified`,
    defaultMessage: 'Specified',
  },
  timeRandom: {
    id: `${scope}.timeRandom`,
    defaultMessage: 'Random',
  },
  timeSpecifiedLabel: {
    id: `${scope}.timeSpecifiedLabel`,
    defaultMessage: 'Exact Time',
  },
  timeRandomFrom: {
    id: `${scope}.timeRandomFrom`,
    defaultMessage: 'From',
  },
  timeRandomTo: {
    id: `${scope}.timeRandomTo`,
    defaultMessage: 'To',
  },
  overwriteUserTimeSettings: {
    id: `${scope}.overwriteUserTimeSettings`,
    defaultMessage: 'Overwrite participant’s preferred time',
  },
  conditions: {
    id: `${scope}.conditions`,
    defaultMessage: 'Conditions',
  },
  sendingOrder: {
    id: `${scope}.sendingOrder`,
    defaultMessage: 'Messages sending order',
  },
  fromFirstQuestion: {
    id: `${scope}.fromFirstQuestion`,
    defaultMessage: 'Start from first message',
  },
  fromLastAnswer: {
    id: `${scope}.fromLastAnswer`,
    defaultMessage: 'Start from last message send',
  },
  formula: {
    id: `${scope}.formula`,
    defaultMessage: 'Formula',
  },
  addVariable: {
    id: `${scope}.addVariable`,
    defaultMessage: '+ Add Variable',
  },
});
