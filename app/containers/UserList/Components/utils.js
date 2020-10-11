import messages from '../messages';

export const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
  formatMessage(messages.activate),
];
