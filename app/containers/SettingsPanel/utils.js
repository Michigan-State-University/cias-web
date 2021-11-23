import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Markup } from 'interweave';

import { formatMessage } from 'utils/intlOutsideReact';

import { InterventionType } from 'models/Intervention/InterventionDto';
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
    sublabel: (
      <Markup
        content={formatMessage(messages.anyoneWithTheLinkSublabel)}
        noWrap
      />
    ),
  },
  {
    id: SHARE_IDS.anyoneWhoIsARegisteredParticipant,
    label: (
      <FormattedMessage {...messages.anyoneWhoIsARegisteredParticipantLabel} />
    ),
    sublabel: (
      <Markup
        content={formatMessage(
          messages.anyoneWhoIsARegisterdParticipantSublabel,
        )}
        noWrap
      />
    ),
  },
  {
    id: SHARE_IDS.onlyInvitedRegisteredParticipant,
    label: (
      <FormattedMessage {...messages.onlyInvitedRegisteredParticipantsLabel} />
    ),
    sublabel: (
      <Markup
        content={formatMessage(
          messages.onlyInvitedRegisteredParticipantsSublabel,
        )}
        noWrap
      />
    ),
  },
];

export const interventionTypesOption = [
  {
    id: InterventionType.DEFAULT,
    label: <FormattedMessage {...messages.normalIntervention} />,
  },
  {
    id: InterventionType.FLEXIBLE,
    label: <FormattedMessage {...messages.flexibleIntervention} />,
  },
  {
    id: InterventionType.FIXED,
    label: <FormattedMessage {...messages.fixedIntervention} />,
  },
];
