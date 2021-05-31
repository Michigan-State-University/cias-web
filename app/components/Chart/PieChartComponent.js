/**
 * PieChart
 * Documentation: https://recharts.org/en-US/api/PieChart
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Pie, PieChart } from 'recharts';

import { StyledResponsiveContainer } from './styled';

const PieChartComponent = ({ children, ...chartProps }) => (
  <StyledResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie startAngle={90} endAngle={450} stroke="none" {...chartProps}>
        {children}
      </Pie>
    </PieChart>
  </StyledResponsiveContainer>
);

PieChartComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

export default memo(PieChartComponent);
