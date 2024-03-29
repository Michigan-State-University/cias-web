import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import groupBy from 'lodash/groupBy';

import { InterventionInvitation } from 'models/Intervention';

import { InvitationListItemState } from 'global/reducers/intervention';

import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';

import messages from './messages';
import { EmailParticipantsTableRow } from './EmailParticipantsTableRow';
import { NormalizedSessions } from './types';

export type Props = {
  healthClinicId?: Nullable<string>;
  invitations: InterventionInvitation[];
  invitationsStates: Record<
    InterventionInvitation['id'],
    InvitationListItemState
  >;
  isModularIntervention: boolean;
  normalizedSessions: NormalizedSessions;
  invitingPossible: boolean;
  onResendInvitation: (invitationId: string) => void;
};

export const EmailParticipantsTable: FC<Props> = ({
  healthClinicId,
  invitations,
  invitationsStates,
  isModularIntervention,
  normalizedSessions,
  invitingPossible,
  onResendInvitation,
}) => {
  const { formatMessage } = useIntl();

  const invitationsGroupedByEmail = useMemo(
    () => Object.entries(groupBy(invitations, 'email')),
    [invitations],
  );

  return (
    <Table width="100%">
      <THead>
        <TR height={46}>
          <TH padding={8}>
            <Text textAlign="left" fontWeight="bold">
              {formatMessage(messages.participantColumnHeader)}
            </Text>
          </TH>
          {!isModularIntervention && (
            <TH padding={8}>
              <Text textAlign="left" fontWeight="bold">
                {formatMessage(messages.invitationsColumnHeader)}
              </Text>
            </TH>
          )}
          <TH width={110}></TH>
        </TR>
      </THead>
      <TBody>
        {invitationsGroupedByEmail.map(([email, groupedInvitations]) => (
          <EmailParticipantsTableRow
            key={email}
            healthClinicId={healthClinicId}
            email={email}
            groupedInvitations={groupedInvitations}
            isModularIntervention={isModularIntervention}
            normalizedSessions={normalizedSessions}
            invitingPossible={invitingPossible}
            onResendInvitation={onResendInvitation}
            resendLoading={groupedInvitations.some(
              ({ id }) => invitationsStates[id]?.resendLoading,
            )}
          />
        ))}
      </TBody>
    </Table>
  );
};
