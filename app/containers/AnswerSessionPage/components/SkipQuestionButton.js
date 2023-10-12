import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TriangleForwardIcon from 'assets/svg/triangle-forward.svg';

import { themeColors } from 'theme';

import { makeSelectInterventionFixedElementsDirection } from 'global/reducers/intervention';
import { LanguageDirection } from 'global/types/locale';

import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';
import Img from 'components/Img';

import messages from '../messages';

const Component = ({ onClick, disabled }) => {
  const { formatMessage } = useIntl();

  const direction = useSelector(makeSelectInterventionFixedElementsDirection());

  return (
    <TextButton
      onClick={onClick}
      disabled={disabled}
      buttonProps={{
        display: 'flex',
        align: 'center',
        gap: 8,
        dir: direction,
      }}
    >
      <Text color={themeColors.secondary} fontWeight="bold">
        {formatMessage(messages.skipQuestion)}
      </Text>
      <Img
        src={TriangleForwardIcon}
        alt={formatMessage(messages.skipIconAlt)}
        flipHorizontal={direction === LanguageDirection.RTL}
      />
    </TextButton>
  );
};

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export const SkipQuestionButton = memo(Component);
