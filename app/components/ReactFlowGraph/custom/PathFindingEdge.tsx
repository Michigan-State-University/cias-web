import React, { memo } from 'react';
import { EdgeProps, getMarkerEnd } from 'react-flow-renderer';

import { SvgPathBuilder } from 'utils/svg';
import { PathFinder } from 'utils/pathFinding';

import { MATRIX_X_SCALE, MATRIX_Y_SCALE } from '../constants';
import { PathFindingEdgeData } from '../types';

const PathFindingEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}: EdgeProps<PathFindingEdgeData>) => {
  if (!data) return null;

  const edgePath = generateEdgePath(data, sourceX, sourceY, targetX, targetY);
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={markerEnd}
    />
  );
};

const generateEdgePath = (
  data: PathFindingEdgeData,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
) => {
  const { matrix } = data;

  const pointsPath = new PathFinder(matrix, {
    matrixScale: { x: MATRIX_X_SCALE, y: MATRIX_Y_SCALE },
  }).findPath(sourceX, sourceY, targetX, targetY);

  const edgePath = new SvgPathBuilder().buildFromPointsSequence(pointsPath, {
    smoothEdge: true,
    smoothRadius: 10,
  });

  return edgePath;
};

export default memo(PathFindingEdge);
