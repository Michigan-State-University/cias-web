import React, { memo } from 'react';
import { NodeProps } from 'react-flow-renderer';

import { ReactFlowNodeHandles } from 'components/ReactFlowGraph';
import Box from 'components/Box';

import { CollapseNodeData } from '../../types';
import { sessionMapColors } from '../../constants';

const SessionMapCollapseNode = ({
  id,
  data: { firstCollapsedScreenNo, lastCollapsedScreenNo },
}: NodeProps<CollapseNodeData>): JSX.Element => {
  const borderX = `1px dashed ${sessionMapColors.sessionNode}`;

  return (
    <>
      <Box
        width={440}
        height={324}
        px={25}
        mx={15}
        borderLeft={borderX}
        borderRight={borderX}
      >
        {id} {firstCollapsedScreenNo} {lastCollapsedScreenNo}
      </Box>
      <ReactFlowNodeHandles
        nodeId={id}
        showSourceHandle
        sourceHandleColor={sessionMapColors.edgeBase}
      />
    </>
  );
};

export default memo(SessionMapCollapseNode);
