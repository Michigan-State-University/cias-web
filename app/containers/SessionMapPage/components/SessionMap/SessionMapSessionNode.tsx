import React, { memo, useMemo, useRef } from 'react';
import { NodeProps } from 'react-flow-renderer';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';

import { SessionTileData } from '../../types';
import { nodeWidth, sessionMapColors } from '../../constants';
import messages from '../../messages';
import SessionMapNodeBriefInfo from './SessionMapNodeBriefInfo';
import SessionMapSessionNodeDetailedInfo from './SessionMapSessionNodeDetailedInfo';

const SessionMapSessionNode = ({
  data: { sessionIndex, showDetailedInfo },
}: NodeProps<SessionTileData>): JSX.Element => {
  const { formatMessage } = useIntl();

  const nodeRef = useRef<HTMLElement>(null);

  // save node height without border and padding on initial render
  const detailedInfoHeight = useMemo(
    () => nodeRef?.current?.firstElementChild?.clientHeight ?? 0,
    [nodeRef.current],
  );

  const sessionNo = sessionIndex + 1;

  return (
    <>
      <Box
        py={18}
        px={24}
        width={nodeWidth}
        bg={sessionMapColors.sessionNode}
        bgOpacity={0.3}
        border={`1px dashed ${sessionMapColors.sessionNode}`}
        cursor="default"
        ref={nodeRef}
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
        nodeId={`session-${sessionNo}`}
        sourceHandleColor={sessionMapColors.edgeBase}
      />
    </>
  );
};

export default memo(SessionMapSessionNode);
