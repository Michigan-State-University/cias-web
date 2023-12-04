import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { makeSelectInterventionFixedElementsDirection } from 'global/reducers/globalState';

import BackButton from 'components/BackButton';
import Box from 'components/Box';
import { Tooltip } from 'components/Tooltip';

import messages from '../messages';

export type Props = {
  onClick?: () => void;
  disabled?: boolean;
  disabledMessage?: string;
};

const ScreenBackButton: FC<Props> = ({
  disabledMessage,
  disabled,
  ...props
}) => {
  const { formatMessage } = useIntl();

  const direction = useSelector(makeSelectInterventionFixedElementsDirection());

  return (
    <Box flexShrink={0}>
      <Tooltip
        id="back-button-tooltip-id"
        visible={disabled && !!disabledMessage}
        text={disabledMessage}
      >
        <BackButton disabled={disabled} direction={direction} {...props}>
          {formatMessage(messages.backButton)}
        </BackButton>
      </Tooltip>
    </Box>
  );
};

export default memo(ScreenBackButton);
