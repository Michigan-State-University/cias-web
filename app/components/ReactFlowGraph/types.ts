import { Matrix2D } from 'utils/pathFinding';

export enum CustomConnectionLineType {
  PathFind = 'path-find',
}

export type PathFindingEdgeData = {
  matrix: Matrix2D;
};
