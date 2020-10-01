import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import messages from './messages';

export const ids = {
  anyoneWithTheLink: 'anyone',
  anyoneWhoIsARegisteredParticipant: 'registered',
  onlyInvitedRegisteredParticipant: 'invited',
};

export const shareOptions = [
  {
    id: ids.anyoneWithTheLink,
    label: <FormattedMessage {...messages.anyoneWithTheLinkLabel} />,
    sublabel: <FormattedHTMLMessage {...messages.anyoneWithTheLinkSublabel} />,
  },
  {
    id: ids.anyoneWhoIsARegisteredParticipant,
    label: (
      <FormattedMessage {...messages.anyoneWhoIsARegisteredParticipantLabel} />
    ),
    sublabel: (
      <FormattedHTMLMessage
        {...messages.anyoneWhoIsARegisterdParticipantSublabel}
      />
    ),
  },
  {
    id: ids.onlyInvitedRegisteredParticipant,
    label: (
      <FormattedMessage {...messages.onlyInvitedRegisteredParticipantsLabel} />
    ),
    sublabel: (
      <FormattedHTMLMessage
        {...messages.onlyInvitedRegisteredParticipantsSublabel}
      />
    ),
  },
];
