import React, { CSSProperties, useMemo, useRef } from 'react';

import Text from 'components/Text';
import Row from 'components/Row';
import Box from 'components/Box';
import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';

import { InteractiveNodeData } from '../../types';
import {
  NODE_HORIZONTAL_NON_CONTENT_WIDTH,
  NODE_LABEL_OFFSET,
  NODE_THICK_BORDER_WIDTH,
  NODE_THIN_BORDER_WIDTH,
  NODE_VERTICAL_NON_CONTENT_WIDTH,
  SESSION_MAP_COLORS,
} from '../../constants';

import { getNodeDimensions, getNodeOpacity } from './utils';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';
import { SessionMapShowDetailsSwitch } from './SessionMapShowDetailsSwitch';

export type SessionMapInteractiveNodeContainerProps = {
  nodeType: string;
  nodeId: string;
  nodeData: InteractiveNodeData;
  showDetails?: boolean;
  onShowDetailsChange?: (showDetails: boolean, questionId: string) => void;
  displaySourceHandle?: boolean;
  label?: string;
  briefInfo: string;
  backgroundColor: CSSProperties['backgroundColor'];
  backgroundOpacity: CSSProperties['opacity'];
  borderStyle: CSSProperties['borderStyle'];
  children: React.ReactNode;
};

export const SessionMapInteractiveNodeContainer = ({
  nodeType,
  nodeId,
  nodeData: { showDetailedInfo, selectableOnClick, selected, onSelectedChange },
  showDetails,
  onShowDetailsChange,
  displaySourceHandle,
  label,
  briefInfo,
  backgroundColor,
  backgroundOpacity,
  borderStyle,
  children,
}: SessionMapInteractiveNodeContainerProps) => {
  const nodeDimensions = useMemo(() => getNodeDimensions(nodeType), [nodeType]);

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () =>
      nodeRef?.current?.firstElementChild?.clientHeight ??
      nodeDimensions.height - 2 * NODE_VERTICAL_NON_CONTENT_WIDTH,
    [nodeRef.current?.firstElementChild?.clientHeight],
  );

  const handleClick = () =>
    selectableOnClick && onSelectedChange(!selected, nodeId);

  const borderWidth = useMemo(
    () =>
      showDetails || selected
        ? NODE_THICK_BORDER_WIDTH
        : NODE_THIN_BORDER_WIDTH,
    [showDetails, selected],
  );

  const borderColor = useMemo(() => {
    if (showDetails) return SESSION_MAP_COLORS.nodeDetailsShown;
    if (selected) return SESSION_MAP_COLORS.selected;
    return SESSION_MAP_COLORS.nodeBase;
  }, [showDetails, selected]);

  const opacity = getNodeOpacity(selectableOnClick, selected);

  const handleShowDetailsChange = (value: boolean) =>
    onShowDetailsChange && onShowDetailsChange(value, nodeId);

  return (
    <Row align="center" height={nodeDimensions.height}>
      {label && showDetailedInfo && (
        <Row
          position="absolute" // to make edge handles stay vertically centered on the tile
          top={-1 * NODE_LABEL_OFFSET}
          height={NODE_LABEL_OFFSET}
          width={nodeDimensions.width}
          justify="center"
          cursor="default"
          opacity={opacity}
        >
          <Text fontSize={14} fontWeight="bold">
            {label}
          </Text>
        </Row>
      )}
      <Box
        py={NODE_VERTICAL_NON_CONTENT_WIDTH - borderWidth}
        px={NODE_HORIZONTAL_NON_CONTENT_WIDTH - borderWidth}
        width={nodeDimensions.width}
        bg={backgroundColor}
        bgOpacity={backgroundOpacity}
        border={`${borderWidth}px ${borderStyle} ${borderColor}`}
        cursor={selectableOnClick ? 'pointer' : 'default'}
        opacity={opacity}
        ref={nodeRef}
        onClick={handleClick}
      >
        {showDetailedInfo && (
          <div>
            {children}
            {showDetails !== undefined && (
              <SessionMapShowDetailsSwitch
                nodeId={nodeId}
                checked={showDetails}
                onToggle={handleShowDetailsChange}
              />
            )}
          </div>
        )}
        {!showDetailedInfo && (
          <SessionMapNodeBriefInfo
            minHeight={detailedInfoHeight}
            info={briefInfo}
          />
        )}
      </Box>
      <ReactFlowNodeHandles
        nodeId={nodeId}
        displaySourceHandle={displaySourceHandle}
        sourceHandleColor={
          selected ? SESSION_MAP_COLORS.selected : SESSION_MAP_COLORS.edgeBase
        }
      />
    </Row>
  );
};
