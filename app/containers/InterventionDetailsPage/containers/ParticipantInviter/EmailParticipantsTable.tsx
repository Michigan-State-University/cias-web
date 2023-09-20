import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { InterventionInvitation } from 'models/Intervention';

import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';

import groupBy from 'lodash/groupBy';
import messages from './messages';
import { EmailParticipantsTableRow } from './EmailParticipantsTableRow';

export type Props = {
  invitations: InterventionInvitation[];
  isModularIntervention: boolean;
};

export const EmailParticipantsTable: FC<Props> = ({
  invitations,
  isModularIntervention,
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
                {formatMessage(messages.sessionsColumnHeader)}
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
            email={email}
            groupedInvitations={groupedInvitations}
            isModularIntervention={isModularIntervention}
          />
        ))}
      </TBody>
    </Table>
  );
};
