import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { InterventionInvitation } from 'models/Intervention';

import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';

import messages from './messages';
import { EmailParticipantsTableRow } from './EmailParticipantsTableRow';

export type Props = {
  invitations: InterventionInvitation[];
};

export const EmailParticipantsTable: FC<Props> = ({ invitations }) => {
  const { formatMessage } = useIntl();

  return (
    <Table width="100%">
      <THead>
        <TR height={46}>
          <TH padding={8}>
            <Text textAlign="left" fontWeight="bold">
              {formatMessage(messages.participantColumnHeader)}
            </Text>
          </TH>
          <TH padding={8}>
            <Text textAlign="left" fontWeight="bold">
              {formatMessage(messages.sessionsColumnHeader)}
            </Text>
          </TH>
          <TH width={110}></TH>
        </TR>
      </THead>
      <TBody>
        {invitations.map((invitation) => (
          <EmailParticipantsTableRow
            key={invitation.id}
            invitation={invitation}
          />
        ))}
      </TBody>
    </Table>
  );
};
