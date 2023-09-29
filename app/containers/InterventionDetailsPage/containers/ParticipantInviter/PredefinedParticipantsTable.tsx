import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import { Table, TBody, TH, THead, TR } from 'components/Table';
import Text from 'components/Text';

import messages from './messages';
import { PredefinedParticipantsTableRow } from './PredefinedParticipantsTableRow';

export type Props = {
  predefinedParticipants: PredefinedParticipant[];
};

export const PredefinedParticipantsTable: FC<Props> = ({
  predefinedParticipants,
}) => {
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
              {formatMessage(messages.statusColumnHeader)}
            </Text>
          </TH>
          <TH padding={8}>
            <Text textAlign="left" fontWeight="bold">
              {formatMessage(messages.smsInvitationColumnHeader)}
            </Text>
          </TH>
          <TH width={110}></TH>
        </TR>
      </THead>
      <TBody>
        {predefinedParticipants.map((predefinedParticipant) => (
          <PredefinedParticipantsTableRow
            key={predefinedParticipant.id}
            predefinedParticipant={predefinedParticipant}
          />
        ))}
      </TBody>
    </Table>
  );
};
