/**
 *
 * Tests for BarChart
 *
 */

import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider, useIntl } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from 'i18n';
import { intlProviderConfig } from 'containers/AppLanguageProvider';

import { ChartStatus, ChartTypeDto } from 'global/reducers/dashboardSections';
import { ChartIntervalType } from 'models/Chart';
import noop from 'lodash/noop';
import { colors } from 'theme';

import Chart from 'components/Chart';

import BarChart from '../BarChart';
import { MAX_NUMERIC_VALUE } from '../../generateBarChartData';

// The recharts wrapper is exercised in `components/Chart/tests/BarChartComponent.test.js`;
// here we only pin what this component hands it.
jest.mock('components/Chart', () => ({
  __esModule: true,
  default: jest.fn(() => null),
  ChartType: jest.requireActual('components/Chart/constants').ChartType,
}));

// The ceiling the pre-fix code would have used - `value + notMatchedValue` peaks on Jan (90),
// while the tallest actual stack is Feb (115).
const NUMERIC_DATA = [
  { label: 'Jan', value: 10, notMatchedValue: 80, invalidValue: 0 },
  { label: 'Feb', value: 30, notMatchedValue: 25, invalidValue: 60 },
];
const TALLEST_NUMERIC_STACK = 115;

const PERCENTAGE_DATA = [
  { label: 'Jan', value: 40, population: 50, invalidValue: 10 },
];

// The y-domain the preview DECLARED before this phase. It did not clip against it: recharts only
// ever raises an explicit domain (`allowDataOverflow` is false and unset repo-wide - see the note
// in `BarChart.js`), so the bars were always drawn in full. The value of declaring the real
// ceiling is that the axis no longer depends on that undocumented fallback.
const OLD_PREVIEW_CEILING = 400;

const Harness = (props) => {
  const { formatMessage } = useIntl();
  return <BarChart formatMessage={formatMessage} {...props} />;
};

const tree = (props) => (
  <IntlProvider
    locale={DEFAULT_LOCALE}
    messages={translationMessages[DEFAULT_LOCALE]}
    {...intlProviderConfig}
    // the app hits the same "not pre-compiled" performance advisory - silence the noise
    onWarn={noop}
  >
    <Harness
      patterns={[{ color: '#5C9CE5' }]}
      trendLine={false}
      disableAnimation
      intervalType={ChartIntervalType.MONTHLY}
      {...props}
    />
  </IntlProvider>
);

const numericProps = {
  chartType: ChartTypeDto.NUMERIC_BAR_CHART,
  realChartData: NUMERIC_DATA,
  status: ChartStatus.PUBLISHED,
};

const percentageProps = {
  chartType: ChartTypeDto.PERCENTAGE_BAR_CHART,
  realChartData: PERCENTAGE_DATA,
  status: ChartStatus.PUBLISHED,
};

const renderComponent = (props = {}) => render(tree(props));

const chartProps = () => Chart.mock.calls[Chart.mock.calls.length - 1][0];

const renderTooltip = (barData, label = 'Jan') =>
  render(
    chartProps().tooltip.content({
      active: true,
      label,
      payload: [{ payload: barData }],
    }),
  );

const stackTotal = ({ value, notMatchedValue = 0, invalidValue = 0 }) =>
  value + notMatchedValue + invalidValue;

describe('<BarChart />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    renderComponent(numericProps);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should give the numeric bar a third stacked series in the reserved grey', () => {
    renderComponent(numericProps);

    expect(chartProps().stackDataKey).toBe('notMatchedValue');
    expect(chartProps().secondStackDataKey).toBe('invalidValue');
    expect(chartProps().secondStackFill).toBe(colors.heather);
    // the same grey the backend reserves for `Invalid / Insufficient Data`
    expect(chartProps().secondStackFill).toBe('#BDC7D6');
  });

  it('Should keep the percentage bar as a single series', () => {
    renderComponent(percentageProps);

    expect(chartProps().stackDataKey).toBe(false);
    expect(chartProps().secondStackDataKey).toBe(false);
  });

  it('Should size the numeric y-domain from the whole stack, invalid included', () => {
    renderComponent(numericProps);

    expect(chartProps().yAxis.domain).toEqual([0, TALLEST_NUMERIC_STACK]);
  });

  it('Should leave the numeric y-domain unchanged when nobody is invalid', () => {
    renderComponent({
      ...numericProps,
      realChartData: NUMERIC_DATA.map((datum) => ({
        ...datum,
        invalidValue: 0,
      })),
    });

    // `matched + notMatched` peaks on Jan at 90 - exactly the ceiling the pre-fix code picked
    expect(chartProps().yAxis.domain).toEqual([0, 90]);
  });

  // The sibling test above sets `invalidValue: 0` PRESENT, which satisfies the `?? 0` guards in
  // `stackTotal` without ever exercising them - remove all three and it stays green. This datum
  // omits the key entirely, which is the shape the API serves during the web-before-api deploy
  // window that phase 3's A6 gate explicitly sanctions. Without the guards the domain becomes
  // [0, undefined] and this fails.
  it('Should keep the numeric y-domain numeric when the datum omits the invalid key', () => {
    renderComponent({
      ...numericProps,
      realChartData: [{ label: 'Jan', value: 10, notMatchedValue: 80 }],
    });

    expect(chartProps().yAxis.domain).toEqual([0, 90]);
  });

  it('Should keep the percentage y-domain at 0-100', () => {
    renderComponent(percentageProps);

    expect(chartProps().yAxis.domain).toEqual([0, 100]);
  });

  it('Should name the invalid count in the numeric tooltip', () => {
    renderComponent(numericProps);

    const { getByText } = renderTooltip(NUMERIC_DATA[1], 'Feb');

    expect(getByText('Feb')).toBeInTheDocument();
    expect(getByText('Matched: 30')).toBeInTheDocument();
    expect(getByText('Not matched: 25')).toBeInTheDocument();
    expect(getByText('Invalid / Insufficient Data: 60')).toBeInTheDocument();
  });

  it('Should name the invalid count and its share in the percentage tooltip', () => {
    renderComponent(percentageProps);

    const { getByText } = renderTooltip(PERCENTAGE_DATA[0]);

    expect(getByText('Jan : 40%')).toBeInTheDocument();
    expect(getByText('Population: 50')).toBeInTheDocument();
    expect(
      getByText('Invalid / Insufficient Data: 10 (20%)'),
    ).toBeInTheDocument();
  });

  // 10/50 = 20 above is an exact integer, so it cannot tell two-decimal rounding from integer
  // rounding - set the rounding factor to 2 and it still passes. This one is fractional and does
  // discriminate: 15/215 = 6.9767... rounds to 6.98 at two places, but to 7 naively.
  it('Should round the percentage tooltip share to two decimal places', () => {
    renderComponent(percentageProps);

    const { getByText } = renderTooltip({
      value: 7,
      population: 215,
      invalidValue: 15,
    });

    expect(
      getByText('Invalid / Insufficient Data: 15 (6.98%)'),
    ).toBeInTheDocument();
  });

  // A gap period: `bar_chart.rb` walks every month between the chart's first and last `filled_at`,
  // so a month with no participants publishes an all-zero datum. Production-reachable, and without
  // `shareOf`'s zero-denominator guard every such tooltip reads `(NaN%)`.
  it('Should show a 0% share for a period with no participants', () => {
    renderComponent(percentageProps);

    const { getByText } = renderTooltip({
      value: 0,
      population: 0,
      invalidValue: 0,
    });

    expect(
      getByText('Invalid / Insufficient Data: 0 (0%)'),
    ).toBeInTheDocument();
  });

  it('Should treat a missing invalid count as 0 in the numeric tooltip', () => {
    renderComponent(numericProps);

    const { getByText } = renderTooltip({
      label: 'Jan',
      value: 10,
      notMatchedValue: 80,
    });

    expect(getByText('Invalid / Insufficient Data: 0')).toBeInTheDocument();
  });

  it('Should rebuild the tooltip when the chart type changes', () => {
    const { rerender } = renderComponent(numericProps);
    const numericTooltip = chartProps().tooltip;

    rerender(tree(percentageProps));

    expect(chartProps().tooltip).not.toBe(numericTooltip);
    const { getByText } = renderTooltip(PERCENTAGE_DATA[0]);
    expect(getByText('Population: 50')).toBeInTheDocument();
  });

  // Both interval types. `generateBarChartPreviewData` has a separate QUARTERLY branch that got
  // the identical edit, and `tree()` hardcodes MONTHLY, so monthly-only coverage left half of work
  // item 6 unrendered (review round 1, finding F2 - taken here rather than deferred, since it is a
  // wrapper around the block the F1 fix already opened).
  [ChartIntervalType.MONTHLY, ChartIntervalType.QUARTERLY].forEach(
    (intervalType) => {
      describe(`draft preview (${intervalType})`, () => {
        const draftProps = (chartType) => ({
          chartType,
          intervalType,
          realChartData: null,
          status: ChartStatus.DRAFT,
        });

        it('Should carry an invalid count on every numeric preview datum', () => {
          renderComponent(draftProps(ChartTypeDto.NUMERIC_BAR_CHART));

          const { data } = chartProps();
          expect(data.length).toBeGreaterThan(0);
          data.forEach((datum) => {
            expect(datum.invalidValue).toBeGreaterThan(0);
          });
        });

        it('Should carry an invalid count on every percentage preview datum', () => {
          renderComponent(draftProps(ChartTypeDto.PERCENTAGE_BAR_CHART));

          const { data } = chartProps();
          expect(data.length).toBeGreaterThan(0);
          data.forEach((datum) => {
            expect(datum.invalidValue).toBeGreaterThan(0);
          });
        });

        it('Should declare a numeric preview ceiling that clears its own tallest stack', () => {
          renderComponent(draftProps(ChartTypeDto.NUMERIC_BAR_CHART));

          const { data, yAxis } = chartProps();
          const tallestStack = Math.max(...data.map(stackTotal));

          // the old ceiling sat below the preview's own tallest stack; recharts raised the axis to the
          // data anyway, so this asserts the ceiling is now declared correctly, not that a clip stopped
          expect(tallestStack).toBeGreaterThan(OLD_PREVIEW_CEILING);
          expect(yAxis.domain).toEqual([0, MAX_NUMERIC_VALUE]);
          expect(MAX_NUMERIC_VALUE).toBeGreaterThanOrEqual(tallestStack);
        });
      });
    },
  );
});
