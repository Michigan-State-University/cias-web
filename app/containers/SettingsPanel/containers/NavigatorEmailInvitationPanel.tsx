import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import bin from 'assets/svg/bin-no-bg.svg';

import Box from 'components/Box';
import H3 from 'components/H3';
import Text from 'components/Text';
import Row from 'components/Row';
import ChipsInput from 'components/Input/ChipsInput';
import Button, { ImageButton } from 'components/Button';

import { PendingNavigatorInvitations } from 'models/NavigatorSetup';
import messages from '../messages';

const SINGLE_EMAIL_HEIGHT = 44;
const ITEM_MARGIN = 8;

type Props = {
  pendingNavigatorInvitations: PendingNavigatorInvitations[];
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
      <H3 mb={30}>{formatMessage(messages.inviteNavigatorsByEmail)}</H3>
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
            height={
              SINGLE_EMAIL_HEIGHT *
                Math.min(3, pendingNavigatorInvitations.length) +
              ITEM_MARGIN * Math.min(2, pendingNavigatorInvitations.length)
            }
            overflow="scroll"
          >
            {pendingNavigatorInvitations.map(({ email, id }, index) => (
              <Box
                display="flex"
                justify="between"
                background={colors.lightBlue}
                padding={12}
                key={id}
                maxHeight={SINGLE_EMAIL_HEIGHT}
                mt={index === 0 ? 0 : ITEM_MARGIN}
              >
                <Text overflow="hidden">{email}</Text>
                {/* @ts-ignore */}
                <ImageButton
                  onClick={() => removeNavigatorEmailInvitation(id)}
                  src={bin}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavigatorEmailInvitationPanel;
