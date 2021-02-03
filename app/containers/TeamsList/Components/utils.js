import messages from '../messages';

export const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.teamAdmin),
  formatMessage(messages.teamAdminEmail),
  formatMessage(messages.delete),
];
