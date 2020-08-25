import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import messages from './messages';

export const ids = {
  anyoneWithTheLink: 'anyone_with_the_link',
  anyoneWhoIsARegisterdParticipant: 'anyone_who_is_a_registerd_participant',
  onlyInvitedRegisteredParticipant: 'only_invited_registered_participants',
};

export const shareOptions = [
  {
    id: ids.anyoneWithTheLink,
    label: <FormattedMessage {...messages.anyoneWithTheLinkLabel} />,
    sublabel: <FormattedHTMLMessage {...messages.anyoneWithTheLinkSublabel} />,
  },
  {
    id: ids.anyoneWhoIsARegisterdParticipant,
    label: (
      <FormattedMessage {...messages.anyoneWhoIsARegisterdParticipantLabel} />
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
