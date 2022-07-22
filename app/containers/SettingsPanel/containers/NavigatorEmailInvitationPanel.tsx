import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import bin from 'assets/svg/bin-no-bg.svg';

import Box from 'components/Box';
import H2 from 'components/H2';
import Text from 'components/Text';
import Row from 'components/Row';
import ChipsInput from 'components/Input/ChipsInput';
import Button, { ImageButton } from 'components/Button';

import { PendingNavigatorInvitation } from 'models/NavigatorSetup';
import messages from '../messages';

const SINGLE_EMAIL_HEIGHT = 36;
const ITEM_MARGIN = 8;

type Props = {
  pendingNavigatorInvitations: PendingNavigatorInvitation[];
  inviteNavigatorsByEmail: (emails: string[]) => void;
  removeNavigatorEmailInvitation: (invitationId: string) => void;
  invitationLoading: boolean;
};

const NavigatorEmailInvitationPanel = ({
  pendingNavigatorInvitations,
  inviteNavigatorsByEmail,
  removeNavigatorEmailInvitation,
  invitationLoading,
}: Props) => {
  const { formatMessage } = useIntl();
  const [emails, setEmails] = useState<string[]>([]);
  const [valid, setValid] = useState(false);

  const inviteNavigators = () => {
    inviteNavigatorsByEmail(emails);
    setEmails([]);
  };

  return (
    <Box>
      <H2 fontSize={16} lineHeight="24px" mb={30}>
        {formatMessage(messages.inviteNavigatorsByEmail)}
      </H2>
      <Text mb={10}>{formatMessage(messages.navigatorEmail)}</Text>
      <Row align="center">
        <ChipsInput
          compact
          value={emails}
          setValue={setEmails}
          placeholder={
            emails.length === 0
              ? formatMessage(messages.navigatorExampleEmail)
              : ''
          }
          onIsValid={setValid}
        />
        {/* @ts-ignore */}
        <Button
          loading={invitationLoading}
          onClick={inviteNavigators}
          ml={12}
          width={90}
          disabled={!valid}
        >
          {formatMessage(messages.invite)}
        </Button>
      </Row>
      {pendingNavigatorInvitations.length !== 0 && (
        <>
          <Text mb={10} mt={20}>
            {formatMessage(messages.waitingForAcceptance)}
          </Text>
          <Box
            maxHeight={3 * SINGLE_EMAIL_HEIGHT + 2 * ITEM_MARGIN}
            overflow="scroll"
          >
            {pendingNavigatorInvitations.map(
              ({ email, id, inDeletion }, index) => (
                <Box
                  display="flex"
                  justify="between"
                  background={colors.lightBlue}
                  key={id}
                  px={11.5}
                  gap={11.5}
                  minHeight={SINGLE_EMAIL_HEIGHT}
                  mt={index === 0 ? 0 : ITEM_MARGIN}
                >
                  <Box py={11.5}>
                    <Text lineHeight="13px">{email}</Text>
                  </Box>
                  <ImageButton
                    title={formatMessage(messages.cancelNavigatorInvitation)}
                    onClick={() => removeNavigatorEmailInvitation(id)}
                    src={bin}
                    loading={inDeletion}
                  />
                </Box>
              ),
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavigatorEmailInvitationPanel;
