/**
 *
 * Tooltip
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text';
import questionMark from 'assets/svg/question-mark.svg';

import { StyledTooltip } from './styled';

const Tooltip = ({ id, children, ...restProps }) => (
  <Box display="flex" {...restProps}>
    <Img src={questionMark} alt="?" data-tip data-for={id} />
    <StyledTooltip id={id} type="light" effect="solid" multiline>
      <Text>{children}</Text>
    </StyledTooltip>
  </Box>
);

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Tooltip;
