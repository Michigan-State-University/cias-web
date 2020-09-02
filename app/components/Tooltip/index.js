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

import { StyledTooltip } from './styled';

const Tooltip = ({ id, children, text, icon, ...restProps }) => (
  <Box display="flex" {...restProps}>
    {icon && <Img src={icon} alt="?" data-tip data-for={id} />}
    {children && (
      <div data-tip data-for={id}>
        {children}
      </div>
    )}
    <StyledTooltip id={id} type="light" effect="solid" multiline>
      <Text>{text}</Text>
    </StyledTooltip>
  </Box>
);

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.any,
  text: PropTypes.string,
};

export default Tooltip;
