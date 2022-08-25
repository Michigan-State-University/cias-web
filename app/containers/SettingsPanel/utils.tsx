import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Markup } from 'interweave';

import { InterventionSharedTo, InterventionType } from 'models/Intervention';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from './messages';
import { OptionType } from './types';

export const shareOptions: OptionType[] = [
  {
    id: InterventionSharedTo.ANYONE,
    label: <FormattedMessage {...messages.anyoneWithTheLinkLabel} />,
    sublabel: (
      <Markup
        content={formatMessage(messages.anyoneWithTheLinkSublabel)}
        noWrap
      />
    ),
  },
  {
    id: InterventionSharedTo.REGISTERED,
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
    id: InterventionSharedTo.INVITED,
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

export const navigatorScriptConfig = {
  headers: [
    { name: 'Header', inputName: 'header', required: true },
    { name: 'Sample message', inputName: 'sampleMessage', required: true },
  ],
  isHeaderNameOptional: false,
};
