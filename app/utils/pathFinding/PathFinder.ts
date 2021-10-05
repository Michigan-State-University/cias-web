import merge from 'lodash/merge';
import PF from 'pathfinding';

import { Point2D } from 'global/types/math';
import { GeometryHelper } from 'utils/mathUtils';

import { DEFAULT_OPTIONS } from './constants';
import { Matrix2D, Options, MatrixNode } from './types';

/**
 * It assumes going over right angles. Requires some tweaking to allow diagonal lines
 */
export class PathFinder {
  private readonly matrix: Readonly<Matrix2D>;

  private readonly grid: Readonly<PF.Grid>;

  private readonly options: Readonly<Options>;

  private matrixScale: Readonly<Point2D>;

  private sourceX: number = -1;

  private sourceY: number = -1;

  private targetX: number = -1;

  private targetY: number = -1;

  private scaledSourceX: number = -1;

  private scaledSourceY: number = -1;

  private scaledTargetX: number = -1;

  private scaledTargetY: number = -1;

  constructor(matrix: Matrix2D, options: Partial<Options>) {
    this.matrix = matrix;
    this.grid = new PF.Grid(matrix);
    this.options = merge({}, DEFAULT_OPTIONS, options);

    const {
      options: { matrixScale },
    } = this;

    this.matrixScale =
      typeof matrixScale === 'number'
        ? { x: matrixScale, y: matrixScale }
        : matrixScale;
  }

  private setup(
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
  ): void {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.targetX = targetX;
    this.targetY = targetY;

    // scale positions to the reduced matrix
    this.scaledSourceY = Math.floor(this.sourceY / this.matrixScale.y);
    let scaledSourceX = Math.floor(this.sourceX / this.matrixScale.x);
    // when scaled down it is possible that edge source position will overlap with node position, so move right in x axis
    while (
      this.matrix[this.scaledSourceY][scaledSourceX] === MatrixNode.Blocked
    ) {
      scaledSourceX += 1;
    }

    this.scaledSourceX = scaledSourceX;

    // scale positions to the reduced matrix
    this.scaledTargetY = Math.floor(targetY / this.matrixScale.y);
    let scaledTargetX = Math.floor(targetX / this.matrixScale.x);
    // when scaled down it is possible that edge target position will overlap with node position, so move left in x axis
    while (
      this.matrix[this.scaledTargetY][scaledTargetX] === MatrixNode.Blocked
    ) {
      scaledTargetX -= 1;
    }

    this.scaledTargetX = scaledTargetX;
  }

  findPath(
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number,
  ): Point2D[] {
    this.setup(sourceX, sourceY, targetX, targetY);

    const path = this.options.finder.findPath(
      this.scaledSourceX,
      this.scaledSourceY,
      this.scaledTargetX,
      this.scaledTargetY,
      this.grid.clone(),
    );

    // path not connected with source and target due to scaling
    const unscaledPath = this.unscaleAndOptimizePath(path);

    const connectionPointsFromSource: Point2D[] =
      this.getConnectionFromSourceToStart(unscaledPath);
    const connectionPointsToTarget: Point2D[] =
      this.getConnectionFromEndToTarget(unscaledPath);

    const finalConnectedPath = [
      ...connectionPointsFromSource,
      ...unscaledPath,
      ...connectionPointsToTarget,
    ];

    return finalConnectedPath;
  }

  private unscaleAndOptimizePath(path: number[][]): Point2D[] {
    // removes redundant points in the same line; only edge points are left
    const compressedPath = PF.Util.compressPath(path);

    return compressedPath.map(([x, y]) => ({
      x: x * this.matrixScale.x,
      y: y * this.matrixScale.y,
    }));
  }

  /**
   * @description WARNING: This function modifies path starting points to prevent diagonal lines
   */
  private getConnectionFromSourceToStart(path: Point2D[]): Point2D[] {
    const { length: pathSize } = path;

    if (pathSize === 1)
      return this.getConnectionFromSourceToStartForSinglePoint(path);

    return this.getConnectionFromSourceToStartForMultiplePoints(path);
  }

  private getConnectionFromSourceToStartForSinglePoint(
    path: Point2D[],
  ): Point2D[] {
    const connectionPointsFromStart: Point2D[] = [];

    const point = path[0];

    point.y = this.targetY;
    connectionPointsFromStart.push(
      { x: this.sourceX, y: this.sourceY },
      { x: point.x, y: this.sourceY },
    );

    return connectionPointsFromStart;
  }

  private getConnectionFromSourceToStartForMultiplePoints(
    path: Point2D[],
  ): Point2D[] {
    const connectionPointsFromStart: Point2D[] = [];

    const firstPoint = path[0];
    const secondPoint = path[1];

    if (GeometryHelper.isLineVertical(firstPoint, secondPoint)) {
      firstPoint.y = this.sourceY;
      connectionPointsFromStart.push({ x: this.sourceX, y: this.sourceY });
    } else {
      firstPoint.x = this.sourceX;
      firstPoint.y = this.sourceY;
      secondPoint.y = this.sourceY;
    }

    return connectionPointsFromStart;
  }

  /**
   * @description WARNING: This function modifies path ending points to prevent diagonal lines
   */
  private getConnectionFromEndToTarget(path: Point2D[]): Point2D[] {
    const { length: pathSize } = path;

    if (pathSize === 1)
      return this.getConnectionFromEndToTargetForSinglePoint();

    return this.getConnectionFromEndToTargetForMultiplePoints(path);
  }

  private getConnectionFromEndToTargetForSinglePoint(): Point2D[] {
    return [{ x: this.targetX, y: this.targetY }];
  }

  private getConnectionFromEndToTargetForMultiplePoints(
    path: Point2D[],
  ): Point2D[] {
    const connectionPointsToEnd: Point2D[] = [];
    const { length: pathSize } = path;

    const beforeLastPoint = path[pathSize - 2];
    const lastPoint = path[pathSize - 1];

    if (GeometryHelper.isLineVertical(beforeLastPoint, lastPoint)) {
      lastPoint.y = this.targetY;
      connectionPointsToEnd.push({ x: this.targetX, y: this.targetY });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (pathSize === 2) {
        connectionPointsToEnd.push(
          { x: lastPoint.x, y: this.targetY },
          { x: this.targetX, y: this.targetY },
        );
      } else {
        beforeLastPoint.y = this.targetY;
        lastPoint.y = this.targetY;
        connectionPointsToEnd.push({ x: this.targetX, y: this.targetY });
      }
    }

    return connectionPointsToEnd;
  }
}
