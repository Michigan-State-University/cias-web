import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import { themeColors } from 'theme';
import ToggleArrow from 'components/ToggleArrow';

const ArrowToggle = ({
  state,
  setState,
  toggleDownMessage,
  toggleUpMessage,
}) => {
  const toggleActive = () => setState(!state);

  return (
    <Row align="center" clickable onClick={toggleActive}>
      <Text width={130} fontWeight="bold" color={themeColors.secondary}>
        {state && toggleDownMessage}
        {!state && toggleUpMessage}
      </Text>
      <ToggleArrow facingUp={state} ml={8} />
    </Row>
  );
};

ArrowToggle.propTypes = {
  state: PropTypes.bool,
  setState: PropTypes.func,
  toggleDownMessage: PropTypes.node,
  toggleUpMessage: PropTypes.node,
};

export default ArrowToggle;
