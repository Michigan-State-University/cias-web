import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import TextButton from 'components/Button/TextButton';
import Comment from 'components/Text/Comment';
import Tooltip from 'components/Tooltip';

import messages from '../messages';

const Component = ({ onClick, disabled }) => {
  const { formatMessage } = useIntl();

  if (disabled)
    return (
      <Tooltip
        id="skip-question"
        text={formatMessage(messages.skipQuestionDisabledTooltip)}
      >
        <Comment disabled>{formatMessage(messages.skipQuestion)}</Comment>
      </Tooltip>
    );

  return (
    <TextButton onClick={onClick} fontSize={14}>
      <Comment>{formatMessage(messages.skipQuestion)}</Comment>
    </TextButton>
  );
};

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export const SkipQuestionButton = memo(Component);
