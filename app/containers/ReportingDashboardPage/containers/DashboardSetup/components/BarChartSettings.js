import React, { memo, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { ChartTypeDto } from 'global/reducers/dashboardSections';

import { ChartIntervalType } from 'models/Chart';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';
import Radio from 'components/Radio';
import Comment from 'components/Text/Comment';
import Checkbox from 'components/Checkbox';
import FlexRow from 'components/Row';

import ChartSettingsGeneralSection from './ChartSettingsGeneralSection';
import ChartSettingsTopSection from './ChartSettingsTopSection';
import BarChartFormulaPattern from './BarChartFormulaPattern';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { ChartSettingsContext, DashboardSectionsContext } from '../constants';

const BarChartSettings = ({
  chart,
  changeStatusLoader,
  onDelete,
  onEditIntervalType,
  onEditChartType,
  onEditDescription,
  onEditFormulaPattern,
  onEditFormulaPayload,
  onEditName,
  onEditStatus,
  onEditTrendLine,
  onCopyChart,
}) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const { chartType, formula, id, status, trendLine, intervalType } = chart;

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  const handleChangeTypeToNumeric = () =>
    onEditChartType(ChartTypeDto.NUMERIC_BAR_CHART);

  const handleChangeTypeToPercentage = () =>
    onEditChartType(ChartTypeDto.PERCENTAGE_BAR_CHART);

  const handleTrendLineChange = () => onEditTrendLine(!trendLine);

  const intervalTypeOptions = useRef(Object.values(ChartIntervalType));

  return (
    <FullWidthContainer>
      <ChartSettingsTopSection
        chartStatus={status}
        chartType={chartType}
        isChangingStatus={changeStatusLoader}
        isDeleting={deleteChartLoader}
        onChangeStatus={onEditStatus}
        onDelete={onDelete}
        hasFormula={formula.payload !== ''}
        onCopyChart={onCopyChart}
      />

      <Row mt={36}>
        <Col>
          <Text mb={5}>
            <Markup
              content={formatMessage(messages.chartSettingsIntervalType)}
              noWrap
            />
          </Text>

          <NoMarginRow align="center">
            <FlexRow align="center" gap={18}>
              {intervalTypeOptions.current.map((option) => (
                <Radio
                  id={`bar-chart-interval-type-toggle-${option}`}
                  disabled={!canBeEdited}
                  checked={intervalType === option}
                  onChange={() => onEditIntervalType(option)}
                >
                  <Text>{formatMessage(messages.intervalType[option])}</Text>
                </Radio>
              ))}
            </FlexRow>
          </NoMarginRow>

          <Text mb={5} mt={36}>
            <Markup
              content={formatMessage(messages.chartSettingsChartValues)}
              noWrap
            />
          </Text>

          <NoMarginRow align="center" mt={36}>
            <Radio
              id={`bar-chart-type-toggle-${ChartTypeDto.NUMERIC_BAR_CHART}`}
              disabled={!canBeEdited}
              checked={chartType === ChartTypeDto.NUMERIC_BAR_CHART}
              onChange={handleChangeTypeToNumeric}
            >
              <Text mr={18}>
                {formatMessage(messages.chartSettingsChartValuesNumericOption)}
              </Text>
            </Radio>

            <Radio
              id={`bar-chart-type-toggle-${ChartTypeDto.PERCENTAGE_BAR_CHART}`}
              disabled={!canBeEdited}
              checked={chartType === ChartTypeDto.PERCENTAGE_BAR_CHART}
              onChange={handleChangeTypeToPercentage}
              mr={9}
            >
              <Text>
                {formatMessage(
                  messages.chartSettingsChartValuesPercentageOption,
                )}
              </Text>
            </Radio>
          </NoMarginRow>

          <Row mt={18}>
            <Col>
              <Comment>
                {formatMessage(messages.chartSettingsChartValuesDescription, {
                  chartType,
                })}
              </Comment>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <NoMarginRow align="center">
            <Checkbox
              id="bar-chart-toggle-trendline"
              disabled={!canBeEdited}
              checked={trendLine}
              onChange={handleTrendLineChange}
              mr={9}
            >
              <Text>
                {formatMessage(messages.chartSettingsTrendLineOption)}
              </Text>
            </Checkbox>
          </NoMarginRow>
        </Col>
      </Row>

      <ChartSettingsGeneralSection
        chart={chart}
        onEditDescription={onEditDescription}
        onEditFormulaPayload={onEditFormulaPayload}
        onEditName={onEditName}
      />

      <Row mt={36}>
        <Col>
          {formula.patterns.map((pattern, index) => (
            <BarChartFormulaPattern
              key={`Pattern-${index}-Chart-${id}`}
              pattern={pattern}
              onEdit={onEditFormulaPattern(index)}
            />
          ))}
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

BarChartSettings.propTypes = {
  chart: PropTypes.object,
  changeStatusLoader: PropTypes.bool,
  onDelete: PropTypes.func,
  onEditIntervalType: PropTypes.func,
  onEditChartType: PropTypes.func,
  onEditDescription: PropTypes.func,
  onEditFormulaPattern: PropTypes.func,
  onEditFormulaPayload: PropTypes.func,
  onEditName: PropTypes.func,
  onEditStatus: PropTypes.func,
  onEditTrendLine: PropTypes.func,
  onCopyChart: PropTypes.func,
};

export default memo(BarChartSettings);
