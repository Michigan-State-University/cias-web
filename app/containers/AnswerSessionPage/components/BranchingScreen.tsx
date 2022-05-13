import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { themeColors } from 'theme';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Box from 'components/Box';
import Button from 'components/Button';
import StyledLink from 'components/StyledLink';

import messages from '../messages';
import { makeSelectPreviousUserSessionId } from '../selectors';
import { getSessionMapUserPreviewUrl } from '../utils';

type Props = {
  resetTransitionalUserSessionId: () => void;
};

const BranchingScreen = ({
  resetTransitionalUserSessionId,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const previousUserSessionId = useSelector(makeSelectPreviousUserSessionId());

  const sessionMapUrl = useMemo(
    () => getSessionMapUserPreviewUrl(previousUserSessionId),
    [previousUserSessionId],
  );

  return (
    <Box mt={50}>
      <H1 textAlign="center">{formatMessage(messages.ongoingBranching)}</H1>
      <H2 textAlign="center" my={20} color={themeColors.warning}>
        {formatMessage(messages.ongoingBranchingParticipantInfo)}
      </H2>
      <Box mt={50} display="flex" justify="around">
        <StyledLink to={sessionMapUrl} target="_blank">
          <Button
            // @ts-ignore
            px={20}
            inverted
            title={formatMessage(messages.goToSessionMap)}
          />
        </StyledLink>
        <Button
          // @ts-ignore
          onClick={resetTransitionalUserSessionId}
          width={200}
          title={formatMessage(messages.continuePreview)}
        />
      </Box>
    </Box>
  );
};

export default BranchingScreen;
