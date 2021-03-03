import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import messages from './messages';

export const SHARE_IDS = {
  anyoneWithTheLink: 'anyone',
  anyoneWhoIsARegisteredParticipant: 'registered',
  onlyInvitedRegisteredParticipant: 'invited',
};

export const shareOptions = [
  {
    id: SHARE_IDS.anyoneWithTheLink,
    label: <FormattedMessage {...messages.anyoneWithTheLinkLabel} />,
    sublabel: <FormattedHTMLMessage {...messages.anyoneWithTheLinkSublabel} />,
  },
  {
    id: SHARE_IDS.anyoneWhoIsARegisteredParticipant,
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
    id: SHARE_IDS.onlyInvitedRegisteredParticipant,
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
