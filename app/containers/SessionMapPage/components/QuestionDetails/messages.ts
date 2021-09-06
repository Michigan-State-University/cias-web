/*
 * SessionMapQuestionDetails Messages
 *
 * This contains all the text for the SessionMapQuestionDetails components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SessionMapQuestionDetails';

export default defineMessages({
  chosenSlide: {
    id: `${scope}.chosenSlide`,
    defaultMessage: 'Chosen slide',
  },
  chosenSlideComment: {
    id: `${scope}.chosenSlideComment`,
    defaultMessage: 'In this section you see more details about choosen slide.',
  },
  jumpToScreen: {
    id: `${scope}.jumpToScreen`,
    defaultMessage: 'Jump to screen',
  },
});
