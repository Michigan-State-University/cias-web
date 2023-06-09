import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';

import arrowheadUp from 'assets/svg/arrowhead-up.svg';
import arrowheadDown from 'assets/svg/arrowhead-down.svg';

import { DropdownContainer } from './styled';

const Dropdown = React.forwardRef(
  ({ children, isOpened, onClick, disabled, bg }, ref) => {
    const arrow = isOpened ? arrowheadUp : arrowheadDown;

    return (
      <DropdownContainer
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        bg={bg}
      >
        <Row align="center" justify="between" height="100%">
          <Box>{children}</Box>
          <Img src={arrow} />
        </Row>
      </DropdownContainer>
    );
  },
);

Dropdown.propTypes = {
  children: PropTypes.node,
  isOpened: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  bg: PropTypes.string,
};

export default Dropdown;
