import React, { memo } from 'react';
import { Position } from 'react-flow-renderer';

import { SourceHandle, TargetHandle } from './styled';

type Props = {
  nodeId: string;
  showSourceHandle?: boolean;
  sourceHandleColor: string;
};

const ReactFlowNodeHandles = ({
  nodeId,
  showSourceHandle,
  sourceHandleColor,
}: Props): JSX.Element => (
  <>
    <TargetHandle
      type="target"
      position={Position.Left}
      id={`${nodeId}-target-handle`}
    />
    {showSourceHandle && (
      <SourceHandle
        type="source"
        position={Position.Right}
        id={`${nodeId}-source-handle`}
        color={sourceHandleColor}
      />
    )}
  </>
);

export default memo(ReactFlowNodeHandles);
