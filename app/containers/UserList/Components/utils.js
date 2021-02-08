import { createContext } from 'react';
import messages from '../messages';

export const TeamIdContext = createContext(null);
export const RemoveFromTeamModalContext = createContext(null);

export const columns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
  formatMessage(messages.activate),
];

export const teamColumns = formatMessage => [
  formatMessage(messages.name),
  formatMessage(messages.email),
  formatMessage(messages.role),
  formatMessage(messages.activate),
  formatMessage(messages.deleteFromTeamColumn),
];
