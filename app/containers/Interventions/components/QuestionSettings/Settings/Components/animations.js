import messages from './messages';

export const facialAnimations = () => [];

export const bodyAnimations = formatMessage => [
  formatMessage(messages.uncertain),
  formatMessage(messages.wave),
  formatMessage(messages.greet),
  formatMessage(messages.pointRight),
  formatMessage(messages.pointLeft),
  formatMessage(messages.pointDown),
  formatMessage(messages.pointUp),
  formatMessage(messages.explain),
  formatMessage(messages.read),
  formatMessage(messages.confused),
  formatMessage(messages.reading),
];
