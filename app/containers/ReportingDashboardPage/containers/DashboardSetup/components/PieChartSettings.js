import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'components/ReactGridSystem';

import { FullWidthContainer } from '../../../styled';

const PieChartSettings = ({ chart }) => (
  <FullWidthContainer>
    <Row>
      <Col>Pie Chart Settings</Col>
    </Row>

    <Row>
      <Col>{chart.name}</Col>
    </Row>
  </FullWidthContainer>
);

PieChartSettings.propTypes = {
  chart: PropTypes.object,
};

export default memo(PieChartSettings);
