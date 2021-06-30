/**
 *
 * Tooltip
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text';

import { StyledTooltip } from './styled';

/**
 * WARNING: It should be placed after the component with `data-tip` property, not before
 * otherwise it will not render properly
 */
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

export default memo(Tooltip);
