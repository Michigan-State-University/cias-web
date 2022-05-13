import React, { memo } from 'react';

type Props = {
  type: string;
  color: string;
};

const ReactFlowArrowHead = ({ color, type }: Props): JSX.Element => (
  <svg>
    <defs>
      <marker
        className="react-flow__arrowhead"
        id={`react-flow__${type}`}
        markerWidth="12.5"
        markerHeight="12.5"
        viewBox="-10 -10 20 20"
        orient="auto"
        refX="0"
        refY="0"
      >
        <polyline
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill="none"
          points="-5,-4 0,0 -5,4"
        />
      </marker>
    </defs>
  </svg>
);

export default memo(ReactFlowArrowHead);
