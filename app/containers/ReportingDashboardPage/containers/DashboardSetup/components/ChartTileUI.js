import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { colors, elements } from 'theme';

import gear from 'assets/svg/gear-pink-background.svg';

import {
  ChartStatusToColorMap,
  ChartTypeDto,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import Box from 'components/Box';
import H2 from 'components/H2';
import Badge from 'components/Badge';
import Icon from 'components/Icon';
import EllipsisText from 'components/Text/EllipsisText';
import Column from 'components/Column';

import { CHART_HEIGHT, CHART_NAME_MAX_WIDTH, CHART_WIDTH } from '../constants';
import messages from '../messages';
import { FullWidthContainer } from '../../../styled';
import { HoverableBox } from '../styled';
import BarChart from './BarChart';
import PieChart from './PieChart';

const ChartTileUI = ({
  chart: {
    chartType,
    description,
    formula: { defaultPattern, patterns },
    id,
    name,
    status,
    trendLine,
    chartData,
  },
  isSelected,
  onClick,
  fromDashboardView,
  isDragging,
  dragHandle,
  disableAnimation,
}) => {
  const { formatMessage } = useIntl();
  const handleOnClick = () => {
    if (!isDragging) {
      onClick(id);
    }
  };

  const renderChart = useCallback(() => {
    switch (chartType) {
      case ChartTypeDto.PIE_CHART:
        return (
          <PieChart
            defaultPattern={defaultPattern}
            patterns={patterns}
            realChartData={chartData}
            formatMessage={formatMessage}
            status={status}
            disableAnimation={disableAnimation}
          />
        );

      case ChartTypeDto.NUMERIC_BAR_CHART:
      case ChartTypeDto.PERCENTAGE_BAR_CHART:
        return (
          <BarChart
            chartType={chartType}
            defaultPattern={defaultPattern}
            patterns={patterns}
            trendLine={trendLine}
            realChartData={chartData}
            status={status}
            formatMessage={formatMessage}
            disableAnimation={disableAnimation}
          />
        );

      default:
        return null;
    }
  }, [patterns, defaultPattern, chartType, trendLine, chartData]);

  return (
    <Col xs="content" mb={40}>
      <Column width={elements.chartTileWidth}>
        <HoverableBox
          bg={colors.white}
          height={elements.chartTileHeight}
          onClick={handleOnClick}
          $isSelected={isSelected}
          padding={24}
          clickable
        >
          <FullWidthContainer height="100%" display="grid">
            <Row align="center" justify="center">
              {!fromDashboardView && <Col xs={2} />}

              <Col align="center" xs={7}>
                <Box maxWidth={CHART_NAME_MAX_WIDTH}>
                  <H2>
                    <EllipsisText text={name} />
                  </H2>
                </Box>
              </Col>

              {!fromDashboardView && (
                <>
                  <Col xs={1} align="end">
                    <Icon src={gear} alt="show-settings" />
                  </Col>
                  {dragHandle}
                </>
              )}
            </Row>

            <Row mt={18}>
              <Col>
                <EllipsisText text={description} lines={2} />
              </Col>
            </Row>

            <Row align="center" justify="center" height={CHART_HEIGHT}>
              <Col xs="content">
                <Box width={CHART_WIDTH} height={CHART_HEIGHT}>
                  {renderChart()}
                </Box>
              </Col>
            </Row>

            <Row align="end" justify="end">
              <Col xs="content">
                <Badge bg={ChartStatusToColorMap[status]} color={colors.white}>
                  {formatMessage(messages.chartStatus, {
                    chartStatus: status,
                  })}
                </Badge>
              </Col>
            </Row>
          </FullWidthContainer>
        </HoverableBox>
      </Column>
    </Col>
  );
};

ChartTileUI.propTypes = {
  chart: PropTypes.object,
  isSelected: PropTypes.bool,
  fromDashboardView: PropTypes.bool,
  onClick: PropTypes.func,
  isDragging: PropTypes.bool,
  dragHandle: PropTypes.node,
  disableAnimation: PropTypes.bool,
};

export default memo(ChartTileUI);
