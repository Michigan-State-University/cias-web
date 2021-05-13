import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import PieChartIcon from 'assets/svg/pieChart.svg';
import BarChartIcon from 'assets/svg/barChart.svg';

import { Col, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';
import H2 from 'components/H2';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import ChartButton from './ChartButton';

const AddChart = ({ addChart }) => {
  const { formatMessage } = useIntl();

  const onAddChart = useCallback(type => () => addChart(type), []);

  return (
    <Box
      bg={colors.linkWater}
      width={600}
      height={300}
      onClick={onAddChart}
      padding="40px 120px"
    >
      <FullWidthContainer height="100%">
        <Row align="center" height="100%">
          <Col>
            <FullWidthContainer>
              <Row justify="center" mb={30}>
                <Col xs="content">
                  <H2>{formatMessage(messages.addChart)}</H2>
                </Col>
              </Row>

              <Row justify="center">
                <Col xs="content">
                  <ChartButton
                    onClick={onAddChart('pieChart')}
                    helperText={formatMessage(messages.pieChartHelper)}
                    title={formatMessage(messages.pieChart)}
                    icon={PieChartIcon}
                  />
                </Col>

                <Col xs="content">
                  <ChartButton
                    onClick={onAddChart('barChart')}
                    helperText={formatMessage(messages.barChartHelper)}
                    title={formatMessage(messages.barChart)}
                    icon={BarChartIcon}
                  />
                </Col>
              </Row>
            </FullWidthContainer>
          </Col>
        </Row>
      </FullWidthContainer>
    </Box>
  );
};

AddChart.propTypes = {
  addChart: PropTypes.func,
};

export default memo(AddChart);
