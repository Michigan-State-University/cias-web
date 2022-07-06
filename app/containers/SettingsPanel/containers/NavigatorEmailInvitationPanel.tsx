import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import bin from 'assets/svg/bin-no-bg.svg';

import Box from 'components/Box';
import H3 from 'components/H3';
import Text from 'components/Text';
import Row from 'components/Row';
import ChipsInput from 'components/Input/ChipsInput';
import Button from 'components/Button';
import Img from 'components/Img';

import messages from '../messages';

const SINGLE_EMAIL_HEIGHT = 44;
const ITEM_MARGIN = 8;

const API_EMAILS = [
  'test1@email.com',
  'test2@email.com',
  'test3@email.com',
  'test4@email.com',
];

const NavigatorEmailInvitationPanel = () => {
  const { formatMessage } = useIntl();
  const [emails, setEmails] = useState<string[]>([]);
  const [valid, setValid] = useState(false);

  const inviteNavigators = () => {
    console.log(emails);
    setEmails([]);
  };

  return (
    <Box>
      <H3 mb={30}>{formatMessage(messages.inviteNavigatorsByEmail)}</H3>
      <Text mb={10}>{formatMessage(messages.navigatorEmail)}</Text>
      <Row align="center">
        <ChipsInput
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
        <Button onClick={inviteNavigators} ml={12} width={90} disabled={!valid}>
          {formatMessage(messages.invite)}
        </Button>
      </Row>
      {API_EMAILS.length !== 0 && (
        <>
          <Text mb={10} mt={20}>
            {formatMessage(messages.waitingForAcceptance)}
          </Text>
          <Box
            height={
              SINGLE_EMAIL_HEIGHT * Math.min(3, API_EMAILS.length) +
              ITEM_MARGIN * Math.min(2, API_EMAILS.length)
            }
            overflow="scroll"
          >
            {API_EMAILS.map((email, index) => (
              <Box
                display="flex"
                justify="between"
                background={colors.lightBlue}
                padding={12}
                key={email}
                maxHeight={SINGLE_EMAIL_HEIGHT}
                mt={index === 0 ? 0 : ITEM_MARGIN}
              >
                <Text>{email}</Text>
                <Img src={bin} />
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default NavigatorEmailInvitationPanel;
