/**
 *
 * Tooltip
 *
 */

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
  CSSProperties,
} from 'react';
import ReactTooltip from 'react-tooltip';

import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';
import useOutsideClick from 'utils/useOutsideClick';

import { TOOLTIP_PORTAL_ID } from 'containers/App/constants';

import Box from 'components/Box';
import Icon from 'components/Icon';
import Text from 'components/Text/Text'; // Import like that due to dependency-cycle
import Portal from 'components/Portal';

import { StyledTooltip } from './styled';

export type TooltipProps = {
  id: string;
  children?: ReactNode;
  visible?: boolean;
  text?: string;
  icon?: any;
  content?: ReactNode;
  place?: 'top' | 'right' | 'bottom' | 'left';
  stretchContent?: boolean;
  backgroundColor?: string;
  allowClicksOnContent?: boolean;
  tooltipProps?: Partial<CSSProperties>;
  iconProps?: object;
  onHide?: () => void;
} & Record<string, unknown>;

/**
 * WARNING: It should be placed after the component with `data-tip` property, not before
 * otherwise it will not render properly
 */
const Tooltip = ({
  id,
  children,
  visible = true,
  text,
  icon,
  content,
  place,
  stretchContent,
  backgroundColor,
  allowClicksOnContent,
  tooltipProps,
  iconProps,
  onHide,
  ...restProps
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>();
  const contentRef = useRef<HTMLDivElement>();
  const [isHovered, setIsHovered] = useState(false);

  const onFocusIn = () => setIsHovered(true);
  const onFocusOut = () => setIsHovered(false);

  const showTooltip = () =>
    tooltipRef.current && ReactTooltip.show(tooltipRef.current);
  const hideTooltip = () => {
    if (onHide) onHide();
    ReactTooltip.hide(tooltipRef.current);
  };

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

  const onTooltipClick = (event: MouseEvent) => {
    if (allowClicksOnContent) return;

    const portal = document.getElementById(TOOLTIP_PORTAL_ID);
    if (portal?.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const getContent = (dataTip: string) => (
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
        {icon && <Icon src={icon} alt="?" {...iconProps} />}
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
            tooltipProps={tooltipProps}
          />
        </Portal>
      )}
    </Box>
  );
};

export default memo(Tooltip);
