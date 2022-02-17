/**
 *
 * Tooltip
 *
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';
import useOutsideClick from 'utils/useOutsideClick';

import { TOOLTIP_PORTAL_ID } from 'containers/App/constants';

import Box from 'components/Box';
import Img from 'components/Img';
import Text from 'components/Text/Text'; // Import like that due to dependency-cycle
import Portal from 'components/Portal';

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
  place,
  stretchContent,
  backgroundColor,
  ...restProps
}) => {
  const tooltipRef = useRef();
  const contentRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const onFocusIn = () => setIsHovered(true);
  const onFocusOut = () => setIsHovered(false);

  const showTooltip = () => ReactTooltip.show(tooltipRef.current);
  const hideTooltip = () => ReactTooltip.hide(tooltipRef.current);

  const shouldShowTooltip = visible && isHovered;

  useKeyPress(KeyCodes.ESC, onFocusOut, shouldShowTooltip);
  useOutsideClick([tooltipRef, contentRef], onFocusOut, shouldShowTooltip);

  useEffect(() => {
    if (shouldShowTooltip) showTooltip();
    else hideTooltip();

    return () => {
      hideTooltip();
    };
  }, [shouldShowTooltip]);

  const onTooltipClick = (event) => {
    const portal = document.getElementById(TOOLTIP_PORTAL_ID);

    if (portal?.contains(event.target)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const getContent = (dataTip) => (
    <Box ref={contentRef}>
      <Text>{dataTip || text}</Text>
      {content}
    </Box>
  );

  const calculateTooltipPosition = useCallback(
    ({ left, top }, event, triggerElement, tooltipElement) => ({
      top,
      left: typeof tooltipElement === 'string' ? left : Math.max(left, 0),
    }),
    [],
  );

  const stretchContentStyle = stretchContent
    ? { width: '100%', height: '100%' }
    : {};

  return (
    <Box
      display="flex"
      {...stretchContentStyle}
      {...restProps}
      onClick={onTooltipClick}
    >
      <Box
        ref={tooltipRef}
        data-tip=""
        data-for={id}
        onMouseEnter={onFocusIn}
        onTouchStart={onFocusIn}
        {...stretchContentStyle}
      >
        {icon && <Img src={icon} alt="?" />}
        {children && <div style={stretchContentStyle}>{children}</div>}
      </Box>

      {shouldShowTooltip && (
        <Portal id={TOOLTIP_PORTAL_ID}>
          <StyledTooltip
            visible={visible}
            id={id}
            type="light"
            effect="solid"
            multiline
            getContent={getContent}
            delayHide={200}
            afterHide={onFocusOut}
            overridePosition={place ? undefined : calculateTooltipPosition}
            place={place}
            backgroundColor={backgroundColor}
          />
        </Portal>
      )}
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
  place: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  stretchContent: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

Tooltip.defaultProps = {
  visible: true,
};

export default memo(Tooltip);
