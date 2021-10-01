import React, { memo, useMemo, useRef } from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';

import { SessionNodeData } from '../../types';
import { nodeWidth, sessionMapColors } from '../../constants';
import messages from '../../messages';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';
import SessionMapSessionNodeDetailedInfo from './SessionMapSessionNodeDetailedInfo';
import { getNodeOpacity } from './utils';

const getBorder = (selected: boolean) =>
  selected
    ? `3px dashed ${sessionMapColors.selected}`
    : `1px dashed ${sessionMapColors.sessionNode}`;

const SessionMapSessionNode = ({
  id,
  data: {
    sessionIndex,
    showDetailedInfo,
    selected,
    onSelectedChange,
    selectableOnClick,
  },
}: NodeProps<SessionNodeData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () => nodeRef?.current?.firstElementChild?.clientHeight ?? 72,
    [nodeRef.current],
  );

  const handleClick = () =>
    selectableOnClick && onSelectedChange(!selected, id);

  const sessionNo = sessionIndex + 1;

  const opacity = getNodeOpacity(selectableOnClick, selected);

  return (
    <>
      <Box
        py={selected ? 16 : 18}
        px={selected ? 22 : 24}
        width={nodeWidth}
        bg={sessionMapColors.sessionNode}
        bgOpacity={0.3}
        border={getBorder(selected)}
        cursor={selectableOnClick ? 'pointer' : 'default'}
        opacity={opacity}
        ref={nodeRef}
        onClick={handleClick}
      >
        {showDetailedInfo && (
          <SessionMapSessionNodeDetailedInfo sessionIndex={sessionNo} />
        )}
        {!showDetailedInfo && (
          <SessionMapNodeBriefInfo
            height={detailedInfoHeight}
            info={formatMessage(messages.sessionNo, { no: sessionNo })}
          />
        )}
      </Box>
      <ReactFlowNodeHandles
        nodeId={id}
        sourceHandleColor={sessionMapColors.edgeBase}
      />
    </>
  );
};

export default memo(SessionMapSessionNode);
