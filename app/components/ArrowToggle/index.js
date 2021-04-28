import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Img from 'components/Img';
import arrowDownSelect from 'assets/svg/arrow-down-select.svg';
import Text from 'components/Text';
import { themeColors } from 'theme';

const ArrowToggle = ({
  state,
  setState,
  toggleDownMessage,
  toggleUpMessage,
}) => {
  const transform = state ? 'rotate(180deg);' : '';
  const transition = 'transform 0.2s;';

  const toggleActive = () => setState(!state);

  return (
    <Row align="center" clickable onClick={toggleActive}>
      <Text width={130} fontWeight="bold" color={themeColors.secondary}>
        {state && toggleDownMessage}
        {!state && toggleUpMessage}
      </Text>
      <Img
        src={arrowDownSelect}
        alt="arrow"
        ml={8}
        transform={transform}
        transition={transition}
      />
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
