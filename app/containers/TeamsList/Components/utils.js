import { createContext } from 'react';
import messages from '../messages';

export const TeamListContext = createContext({ isAdmin: false });

export const adminColumns = (formatMessage) => [
  formatMessage(messages.name),
  formatMessage(messages.teamAdmin),
  formatMessage(messages.teamAdminEmail),
  formatMessage(messages.delete),
];

export const teamAdminColumns = (formatMessage) => [
  formatMessage(messages.name),
  formatMessage(messages.teamAdmin),
  formatMessage(messages.teamAdminEmail),
];
