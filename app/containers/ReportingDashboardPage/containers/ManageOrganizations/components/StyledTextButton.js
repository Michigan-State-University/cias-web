import PropTypes from 'prop-types';
import React, { memo } from 'react';

import { themeColors } from 'theme';

import TextButton from 'components/Button/TextButton';
import Text from 'components/Text';

const StyledTextButton = ({ text, onClick, loading }) => (
  <TextButton onClick={onClick} loading={loading}>
    <Text color={themeColors.secondary} fontWeight="bold">
      {text}
    </Text>
  </TextButton>
);

StyledTextButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default memo(StyledTextButton);
