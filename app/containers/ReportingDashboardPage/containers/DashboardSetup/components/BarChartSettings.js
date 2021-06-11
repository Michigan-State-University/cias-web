import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { ChartTypeDto } from 'global/reducers/dashboardSections';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';
import Radio from 'components/Radio';
import Comment from 'components/Text/Comment';
import Checkbox from 'components/Checkbox';

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

  const { chartType, formula, id, status, trendLine } = chart;

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  const handleChangeTypeToNumeric = () =>
    onEditChartType(ChartTypeDto.NUMERIC_BAR_CHART);

  const handleChangeTypeToPercentage = () =>
    onEditChartType(ChartTypeDto.PERCENTAGE_BAR_CHART);

  const handleTrendLineChange = () => onEditTrendLine(!trendLine);

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
              content={formatMessage(messages.chartSettingsChartValues)}
              noWrap
            />
          </Text>

          <NoMarginRow align="center">
            <Radio
              disabled={!canBeEdited}
              checked={chartType === ChartTypeDto.NUMERIC_BAR_CHART}
              onClick={handleChangeTypeToNumeric}
              mr={9}
            />
            <Text mr={18}>
              {formatMessage(messages.chartSettingsChartValuesNumericOption)}
            </Text>

            <Radio
              disabled={!canBeEdited}
              checked={chartType === ChartTypeDto.PERCENTAGE_BAR_CHART}
              onClick={handleChangeTypeToPercentage}
              mr={9}
            />
            <Text>
              {formatMessage(messages.chartSettingsChartValuesPercentageOption)}
            </Text>
          </NoMarginRow>

          <Row mt={36}>
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
              disabled={!canBeEdited}
              checked={trendLine}
              onClick={handleTrendLineChange}
              mr={9}
            />
            <Text>{formatMessage(messages.chartSettingsTrendLineOption)}</Text>
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
