import React from 'react';
import PropTypes from 'prop-types';

import { LabelContainer } from './styled';

export const UnderlinedLabel = ({ text, isActive, onClick, style }) => (
  <LabelContainer isActive={isActive} onClick={onClick} style={style}>
    {text}
  </LabelContainer>
);

UnderlinedLabel.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  style: PropTypes.object,
};
