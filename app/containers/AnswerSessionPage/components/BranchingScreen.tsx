import React from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Box from 'components/Box';
import Button from 'components/Button';

import messages from '../messages';
type Props = {
  userSessionId: string;
};

const BranchingScreen = ({ userSessionId }: Props) => {
  console.log(userSessionId);
  const { formatMessage } = useIntl();
  return (
    <Box mt={50}>
      <H1 textAlign="center">{formatMessage(messages.ongoingBranching)}</H1>
      <H2 textAlign="center" my={20} color={themeColors.warning}>
        {formatMessage(messages.ongoingBranchingParticipantInfo)}
      </H2>
      <Box mt={50} display="flex" justify="around">
        {/* @ts-ignore */}
        <Button width={200} title={formatMessage(messages.goToSessionMap)} />
        {/* @ts-ignore */}
        <Button width={200} title={formatMessage(messages.continuePreview)} />
      </Box>
    </Box>
  );
};

export default BranchingScreen;
