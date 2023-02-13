import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

import TextButton from 'components/Button/TextButton';
import Comment from 'components/Text/Comment';

import messages from '../messages';

const Component = ({ onClick, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <TextButton onClick={onClick} fontSize={14} disabled={disabled}>
      <Comment>{formatMessage(messages.skipQuestion)}</Comment>
    </TextButton>
  );
};

Component.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export const SkipQuestionButton = memo(Component);
