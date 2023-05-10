import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import triangleBack from 'assets/svg/triangle-back.svg';

import { themeColors } from 'theme';

import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Img from 'components/Img';

import messages from '../messages';

const Component = ({ onClick, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <TextButton
      onClick={onClick}
      disabled={disabled}
      buttonProps={{
        display: 'flex',
        align: 'center',
        gap: 8,
      }}
    >
      <Text color={themeColors.secondary} fontWeight="bold">
        {formatMessage(messages.skipQuestion)}
      </Text>
      <Img
        src={triangleBack}
        alt={formatMessage(messages.skipIconAlt)}
        transform="scaleX(-1)"
      />
    </TextButton>
  );
};

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export const SkipQuestionButton = memo(Component);
