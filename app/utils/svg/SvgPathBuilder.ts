import { Point2D } from 'global/types/math';

import { GeometryHelper } from 'utils/mathUtils';

import { SvgPathHelper } from './SvgPathHelper';
import { Options } from './types';
import { DEFAULT_OPTIONS } from './constants';

export class SvgPathBuilder {
  path = '';

  moveTo(point: Point2D): SvgPathBuilder {
    this.path += `${SvgPathHelper.moveTo(point)} `;

    return this;
  }

  drawLine(point: Point2D): SvgPathBuilder {
    this.path += `${SvgPathHelper.drawLine(point)} `;

    return this;
  }

  drawHorizontalLine(distance: number): SvgPathBuilder {
    this.path += `${SvgPathHelper.drawHorizontalLine(distance)} `;

    return this;
  }

  drawVerticalLine(distance: number): SvgPathBuilder {
    this.path += `${SvgPathHelper.drawVerticalLine(distance)} `;

    return this;
  }

  drawCubicBezierCurve(
    startPoint: Point2D,
    controlPoint: Point2D,
    endPoint: Point2D,
  ): SvgPathBuilder {
    this.path += `${SvgPathHelper.drawCubicBezierCurve(
      startPoint,
      controlPoint,
      endPoint,
    )} `;

    return this;
  }

  drawQuadraticBezierCurve(
    controlPoint: Point2D,
    endPoint: Point2D,
  ): SvgPathBuilder {
    this.path += `${SvgPathHelper.drawQuadraticBezierCurve(
      controlPoint,
      endPoint,
    )} `;

    return this;
  }

  buildFromPointsSequence(
    points: Point2D[],
    options: Options = DEFAULT_OPTIONS,
  ): string {
    const { length: pointsSize } = points;
    points.forEach((point, index) => {
      if (index === 0) {
        this.moveTo(point);
      } else if (index === pointsSize - 1 || !options.smoothEdge) {
        this.drawLine(point);
      } else {
        this.drawSmoothEdge(index, points, options);
      }
    });

    return this.build();
  }

  private drawSmoothEdge(
    index: number,
    points: Point2D[],
    options: Options & { smoothEdge: true },
  ): void {
    const previousPoint = points[index - 1];
    const currentPoint = points[index];
    const nextPoint = points[index + 1];

    if (!GeometryHelper.isRightAngle(previousPoint, currentPoint, nextPoint)) {
      this.drawLine(currentPoint);
    } else {
      const { smoothRadius } = options;

      const { curveStartPoint, curveEndPoint } = GeometryHelper.smoothAngle(
        previousPoint,
        currentPoint,
        nextPoint,
        smoothRadius,
      );

      this.drawLine(curveStartPoint);
      this.drawQuadraticBezierCurve(currentPoint, curveEndPoint);
    }
  }

  build(): string {
    return this.path;
  }
}
