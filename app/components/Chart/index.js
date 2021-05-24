/**
 * Chart
 * Documentation: https://recharts.org/en-US
 *
 */

import React, { memo, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie } from 'recharts';

import { StyledResponsiveContainer } from 'components/Chart/styled';

import { ChartType, RADIAN } from './constants';

/**
 * @typedef {Object} Props
 * @property {string} type
 * @property {ReactNode| ReactNode[]} children
 */

/**
 * @type {React.ForwardRefExoticComponent<Props>}
 */
const Chart = React.forwardRef(({ type, children, ...chartProps }, ref) => {
  const wrapper = component => (
    <StyledResponsiveContainer width="100%" height="100%">
      {component}
    </StyledResponsiveContainer>
  );

  switch (type) {
    case ChartType.PIE:
    default:
      return wrapper(
        <PieChart>
          <Pie
            ref={ref}
            startAngle={90}
            endAngle={450}
            stroke="none"
            {...chartProps}
          >
            {children}
          </Pie>
        </PieChart>,
      );
  }
});

Chart.propTypes = {
  type: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
};

export { ChartType, RADIAN };
export default memo(Chart);
