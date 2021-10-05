import { Point2D } from 'global/types/math';
import isNullOrUndefined from 'utils/isNullOrUndefined';

export class GeometryHelper {
  static isLineHorizontal(
    { x: startX, y: startY }: Point2D,
    { x: endX, y: endY }: Point2D,
  ): boolean {
    return startY === endY && startX !== endX;
  }

  static isLineVertical(
    { x: startX, y: startY }: Point2D,
    { x: endX, y: endY }: Point2D,
  ): boolean {
    return startX === endX && startY !== endY;
  }

  static isRightAngle(
    startPoint: Point2D,
    middlePoint: Point2D,
    endPoint: Point2D,
  ): boolean {
    return (
      (this.isLineVertical(startPoint, middlePoint) &&
        this.isLineHorizontal(middlePoint, endPoint)) ||
      (this.isLineHorizontal(startPoint, middlePoint) &&
        this.isLineVertical(middlePoint, endPoint))
    );
  }

  // Only right angles right now
  static smoothAngle(
    startPoint: Point2D,
    middlePoint: Point2D,
    endPoint: Point2D,
    smoothRadius: number,
  ): { curveStartPoint: Point2D; curveEndPoint: Point2D } {
    let curveStartPoint: Nullable<Point2D>;
    let curveEndPoint: Nullable<Point2D>;
    let horizontalPadding: number;
    let verticalPadding: number;
    let radius: number;

    if (
      GeometryHelper.isLineVertical(startPoint, middlePoint) &&
      GeometryHelper.isLineHorizontal(middlePoint, endPoint)
    ) {
      radius = Math.min(
        Math.abs(startPoint.y - middlePoint.y) / 2,
        smoothRadius,
      );
      verticalPadding = startPoint.y > middlePoint.y ? radius : -radius;
      horizontalPadding = middlePoint.x > endPoint.x ? -radius : radius;

      curveStartPoint = {
        x: middlePoint.x,
        y: middlePoint.y + verticalPadding,
      };
      curveEndPoint = {
        x: middlePoint.x + horizontalPadding,
        y: middlePoint.y,
      };
    } else if (
      GeometryHelper.isLineHorizontal(startPoint, middlePoint) &&
      GeometryHelper.isLineVertical(middlePoint, endPoint)
    ) {
      const maxRadius = Math.min(
        Math.abs(middlePoint.y - endPoint.y) / 2,
        smoothRadius,
      );
      horizontalPadding = startPoint.x > middlePoint.x ? maxRadius : -maxRadius;
      verticalPadding = middlePoint.y > endPoint.y ? -maxRadius : maxRadius;

      curveStartPoint = {
        x: middlePoint.x + horizontalPadding,
        y: middlePoint.y,
      };
      curveEndPoint = {
        x: middlePoint.x,
        y: middlePoint.y + verticalPadding,
      };
    }

    if (isNullOrUndefined(curveStartPoint) || isNullOrUndefined(curveEndPoint))
      throw Error('Right angle must be provided');

    return { curveStartPoint: curveStartPoint!, curveEndPoint: curveEndPoint! };
  }
}
