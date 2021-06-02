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

import { CHART_HEIGHT, CHART_NAME_MAX_WIDTH, CHART_WIDTH } from '../constants';
import messages from '../messages';
import { FullWidthContainer } from '../../../styled';
import { HoverableBox } from '../styled';
import BarChart from './BarChart';
import PieChart from './PieChart';

const ChartTileUI = ({
  chart: {
    chartType,
    formula: { defaultPattern, patterns },
    id,
    name,
    status,
    trendLine,
  },
  isSelected,
  onClick,
  fromDashboardView,
}) => {
  const { formatMessage } = useIntl();

  const handleOnClick = () => onClick(id);

  const renderChart = useCallback(() => {
    switch (chartType) {
      case ChartTypeDto.PIE_CHART:
        return <PieChart defaultPattern={defaultPattern} patterns={patterns} />;

      case ChartTypeDto.NUMERIC_BAR_CHART:
      case ChartTypeDto.PERCENTAGE_BAR_CHART:
        return (
          <BarChart
            chartType={chartType}
            defaultPattern={defaultPattern}
            patterns={patterns}
            trendLine={trendLine}
          />
        );

      default:
        return null;
    }
  }, [patterns, defaultPattern, chartType, trendLine]);

  return (
    <HoverableBox
      bg={colors.white}
      width={elements.chartTileWidth}
      height={elements.chartTileHeight}
      onClick={handleOnClick}
      $isSelected={isSelected}
      padding={24}
      clickable
    >
      <FullWidthContainer height="100%">
        <Row align="center" justify="center">
          {!fromDashboardView && <Col xs={1} />}

          <Col align="center" xs={9}>
            <Box maxWidth={CHART_NAME_MAX_WIDTH}>
              <H2>
                <EllipsisText text={name} />
              </H2>
            </Box>
          </Col>

          {!fromDashboardView && (
            <Col xs={1} align="end">
              <Icon src={gear} alt="show-settings" />
            </Col>
          )}
        </Row>

        <Row align="center" justify="center" height={CHART_HEIGHT}>
          <Col xs="content">
            <Box width={CHART_WIDTH} height={CHART_HEIGHT}>
              {renderChart()}
            </Box>
          </Col>
        </Row>

        <Row align="center" justify="end">
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
  );
};

ChartTileUI.propTypes = {
  chart: PropTypes.object,
  isSelected: PropTypes.bool,
  fromDashboardView: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(ChartTileUI);
