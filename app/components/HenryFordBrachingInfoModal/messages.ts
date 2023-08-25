import { defineMessages } from 'react-intl';

export const scope = 'app.components.HenryFordBranchingInfoModal';

export default defineMessages({
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Henry Ford Branching',
  },
  content: {
    id: `${scope}.content`,
    defaultMessage: `It looks like you want to duplicate {type, select, session {a session in the intervention} other {the intervention}} which includes Henry Ford's integration. <bold>Access to the Henry Ford's integration for the copy will need to be granted by a CIAS admin again</bold>. Also, Henry Ford Initial Screens will be removed from the copy together with all of their branching connections.`,
  },
  okay: {
    id: `${scope}.okay`,
    defaultMessage: 'Okay, I understand',
  },
});
