import { Point2D } from 'global/types/math';

export class SvgPathHelper {
  static moveTo({ x, y }: Point2D): string {
    return `M ${x} ${y}`;
  }

  static drawLine({ x, y }: Point2D): string {
    return `L ${x} ${y}`;
  }

  static drawHorizontalLine(distance: number): string {
    return `H ${distance}`;
  }

  static drawVerticalLine(distance: number): string {
    return `V ${distance}`;
  }

  static drawCubicBezierCurve(
    { x: startX, y: startY }: Point2D,
    { x: controlX, y: controlY }: Point2D,
    { x: endX, y: endY }: Point2D,
  ): string {
    return `C ${startX} ${startY}, ${controlX} ${controlY}, ${endX} ${endY}`;
  }

  static drawQuadraticBezierCurve(
    { x: controlX, y: controlY }: Point2D,
    { x: endX, y: endY }: Point2D,
  ): string {
    return `Q ${controlX} ${controlY}, ${endX} ${endY}`;
  }
}
