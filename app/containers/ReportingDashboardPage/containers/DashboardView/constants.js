import messages from '../../messages';

export const DEFAULT_OPTION = (formatMessage) => ({
  value: 0,
  label: formatMessage(messages.allTime),
});

export const SELECT_OPTIONS = (formatMessage) => [
  { value: 30, label: formatMessage(messages.xDays, { numberOfDays: 30 }) },
  { value: 90, label: formatMessage(messages.xDays, { numberOfDays: 90 }) },
  { value: 180, label: formatMessage(messages.xDays, { numberOfDays: 180 }) },
  { value: 365, label: formatMessage(messages.singleYear) },
  DEFAULT_OPTION(formatMessage),
];
