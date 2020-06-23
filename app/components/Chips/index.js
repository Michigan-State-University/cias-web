import React from 'react';
import PropTypes from 'prop-types';

import { StyledChips, ChipsText } from './styled';

const Chips = props => (
  <StyledChips {...props}>
    <ChipsText isActive={props.isActive}>{props.children}</ChipsText>
  </StyledChips>
);

Chips.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
};

export default Chips;
