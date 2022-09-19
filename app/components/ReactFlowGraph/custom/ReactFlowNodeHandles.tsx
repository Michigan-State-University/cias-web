import React, { memo } from 'react';
import { Position } from 'react-flow-renderer';

import { SourceHandle, TargetHandle } from './styled';

type Props = {
  nodeId: string;
  displaySourceHandle?: boolean;
  sourceHandleColor: string;
};

const ReactFlowNodeHandles = ({
  nodeId,
  displaySourceHandle,
  sourceHandleColor,
}: Props): JSX.Element => (
  <>
    <TargetHandle
      type="target"
      position={Position.Left}
      id={`${nodeId}-target-handle`}
    />
    {displaySourceHandle && (
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
