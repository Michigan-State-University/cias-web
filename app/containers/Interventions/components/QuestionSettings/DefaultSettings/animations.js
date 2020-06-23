import messages from './messages';

export const facialAnimations = () => [];

export const bodyAnimations = formatMessage => [
  formatMessage(messages.shrug),
  formatMessage(messages.wave),
  formatMessage(messages.bow),
];
