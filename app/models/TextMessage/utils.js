import sortBy from 'lodash/sortBy';

/**
 * Sort Text Messages based on the date of the SMS to be sent
 * @param {Array<TextMessage>} textMessages
 * @return {Array<TextMessage>}
 */
export const sortTextMessagesByDate = (textMessages) =>
  sortBy(textMessages, [
    'schedulePayload',
    (textMessage) => textMessage.name?.toLowerCase(),
  ]);
