/**
 *
 * Tests for BarChartComponent
 *
 */

import React from 'react';
import { render } from '@testing-library/react';

import BarChartComponent from '../BarChartComponent';

// `ResponsiveContainer` measures its parent and jsdom reports 0x0, so without a fixed size
// recharts renders an empty wrapper and no series at all.
jest.mock('recharts', () => {
  const actual = jest.requireActual('recharts');
  // eslint-disable-next-line global-require
  const ReactLib = require('react');
  return {
    ...actual,
    ResponsiveContainer: ({ children }) =>
      ReactLib.cloneElement(children, { width: 600, height: 400 }),
  };
});

const MATCHED_FILL = '#5C9CE5';
// `Color(MATCHED_FILL).lighten(0.5).hex()` - pinned so the not-matched segment keeps the colour
// it derives today and no published numeric bar chart is restyled.
const DERIVED_NOT_MATCHED_FILL = '#E6F0FB';
const INVALID_FILL = '#BDC7D6';

const defaultProps = {
  data: [{ label: 'Jan', value: 10, notMatchedValue: 20, invalidValue: 5 }],
  dataKey: 'value',
  fill: MATCHED_FILL,
  xAxis: { dataKey: 'label', interval: 0 },
  yAxis: { domain: [0, 35], allowDecimals: false },
  isAnimationActive: false,
};

const renderComponent = (props = {}) =>
  render(<BarChartComponent {...defaultProps} {...props} />);

const barSeries = (container) =>
  Array.from(container.querySelectorAll('.recharts-bar')).map((series) =>
    series.querySelector('path'),
  );

// `null` where recharts painted no rectangle at all - it skips zero-valued segments
const seriesFills = (container) =>
  barSeries(container).map(
    (rectangle) => rectangle?.getAttribute('fill') ?? null,
  );

const seriesOrigins = (container) =>
  barSeries(container).map((rectangle) => {
    const [, x, y] = /M\s*([\d.-]+),\s*([\d.-]+)/.exec(
      rectangle.getAttribute('d'),
    );
    return { x: Number(x), y: Number(y) };
  });

describe('<BarChartComponent />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent({
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: 'invalidValue',
      secondStackFill: INVALID_FILL,
    });
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render a single series when no stacked key is given', () => {
    const { container } = renderComponent();

    expect(seriesFills(container)).toEqual([MATCHED_FILL]);
  });

  it('Should render two series when only the first stacked key is given', () => {
    const { container } = renderComponent({
      stackDataKey: 'notMatchedValue',
    });

    expect(seriesFills(container)).toEqual([
      MATCHED_FILL,
      DERIVED_NOT_MATCHED_FILL,
    ]);
  });

  it('Should render three series with the second stacked key in its explicit colour', () => {
    const { container } = renderComponent({
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: 'invalidValue',
      secondStackFill: INVALID_FILL,
    });

    expect(seriesFills(container)).toEqual([
      MATCHED_FILL,
      DERIVED_NOT_MATCHED_FILL,
      INVALID_FILL,
    ]);
  });

  it('Should not derive the second stacked colour from `fill`', () => {
    const { container } = renderComponent({
      fill: '#107969',
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: 'invalidValue',
      secondStackFill: INVALID_FILL,
    });

    const [matched, notMatched, invalid] = seriesFills(container);
    expect(matched).toBe('#107969');
    // the derived segment follows `fill`...
    expect(notMatched).not.toBe(DERIVED_NOT_MATCHED_FILL);
    // ...the reserved one does not
    expect(invalid).toBe(INVALID_FILL);
  });

  it('Should stack the three series rather than group them side by side', () => {
    const { container } = renderComponent({
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: 'invalidValue',
      secondStackFill: INVALID_FILL,
    });

    const [matched, notMatched, invalid] = seriesOrigins(container);

    // one column - same x for every segment
    expect(notMatched.x).toBe(matched.x);
    expect(invalid.x).toBe(matched.x);
    // ...and each segment sits above the previous one (SVG y grows downwards)
    expect(notMatched.y).toBeLessThan(matched.y);
    expect(invalid.y).toBeLessThan(notMatched.y);
  });

  it('Should paint no rectangle for a second stacked series that is all zeros', () => {
    const { container } = renderComponent({
      data: [{ label: 'Jan', value: 10, notMatchedValue: 20, invalidValue: 0 }],
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: 'invalidValue',
      secondStackFill: INVALID_FILL,
    });

    // the series is declared but draws nothing, so a chart with no invalid rows looks
    // exactly as it did before the third segment existed
    expect(seriesFills(container)).toEqual([
      MATCHED_FILL,
      DERIVED_NOT_MATCHED_FILL,
      null,
    ]);
  });

  it('Should omit the second stacked series when its key is falsy', () => {
    const { container } = renderComponent({
      stackDataKey: 'notMatchedValue',
      secondStackDataKey: false,
      secondStackFill: INVALID_FILL,
    });

    expect(seriesFills(container)).toHaveLength(2);
  });
});
