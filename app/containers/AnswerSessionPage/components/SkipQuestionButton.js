import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import TriangleForwardIcon from 'assets/svg/triangle-forward.svg';

import { themeColors } from 'theme';

import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Img from 'components/Img';

import messages from '../messages';

const Component = ({ onClick, disabled, dir }) => {
  const { formatMessage } = useIntl();

  return (
    <TextButton
      onClick={onClick}
      disabled={disabled}
      buttonProps={{
        display: 'flex',
        align: 'center',
        gap: 8,
        dir,
      }}
    >
      <Text color={themeColors.secondary} fontWeight="bold">
        {formatMessage(messages.skipQuestion)}
      </Text>
      <Img
        src={TriangleForwardIcon}
        alt={formatMessage(messages.skipIconAlt)}
        flipHorizontally={!dir || dir === 'ltr'}
      />
    </TextButton>
  );
};

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  dir: PropTypes.oneOf(['ltr', 'rtl']),
};

export const SkipQuestionButton = memo(Component);
