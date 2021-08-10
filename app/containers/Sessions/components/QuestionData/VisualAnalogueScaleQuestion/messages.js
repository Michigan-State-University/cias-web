import { defineMessages } from 'react-intl';

export const scope = 'app.containers.VisualAnalogueScale';

export default defineMessages({
  startValue: {
    id: `${scope}.startValue`,
    defaultMessage: 'Start value',
  },
  endValue: {
    id: `${scope}.endValue`,
    defaultMessage: 'End value',
  },
  sliderLabel: {
    id: `${scope}.sliderLabel`,
    defaultMessage: 'Select a value on a slider:',
  },
});
