/**
 *
 * Tooltip
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text';

import { StyledTooltip } from './styled';

const Tooltip = ({
  id,
  children,
  visible,
  text,
  icon,
  content,
  ...restProps
}) => {
  const getContent = dataTip => {
    // Needed for dynamic content updates, like SVG etc.
    ReactTooltip.rebuild();

    if (dataTip) return <Text>{dataTip ?? text}</Text>;
    return (
      <>
        <Text>{text}</Text>
        {content}
      </>
    );
  };

  return (
    <Box display="flex" {...restProps}>
      {icon && <Img src={icon} alt="?" data-tip="" data-for={id} />}
      {children && (
        <div data-tip="" data-for={id}>
          {children}
        </div>
      )}
      <StyledTooltip
        visible={visible}
        id={id}
        type="light"
        effect="solid"
        multiline
        getContent={getContent}
      />
    </Box>
  );
};

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  icon: PropTypes.any,
  text: PropTypes.string,
  content: PropTypes.node,
  visible: PropTypes.bool,
};

Tooltip.defaultProps = {
  visible: true,
};

export default Tooltip;
