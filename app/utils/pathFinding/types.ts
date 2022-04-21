import PF from 'pathfinding';

import { Point2D } from 'global/types/math';

export type Matrix2D = number[][];

export enum MatrixNode {
  Walkable = 0,
  Blocked = 1,
}

export type Options = {
  matrixScale: number | Point2D;
  finder: PF.Finder;
};
