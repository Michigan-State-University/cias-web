import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { ChartType } from 'global/reducers/dashboardSections';

import { Col, NoMarginRow, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';
import DashedButton from 'components/Button/DashedButton';
import Radio from 'components/Radio';
import Comment from 'components/Text/Comment';
import Checkbox from 'components/Checkbox';

import ChartSettingsGeneralSection from './ChartSettingsGeneralSection';
import ChartSettingsTopSection from './ChartSettingsTopSection';
import BarChartFormulaPattern from './BarChartFormulaPattern';
import BarChartFormulaOtherPattern from './BarChartFormulaOtherPattern';

import { FullWidthContainer } from '../../../styled';
import messages from '../messages';
import { ChartSettingsContext, DashboardSectionsContext } from '../constants';

const BarChartSettings = ({
  chart,
  addPatternLoader,
  onAddFormulaPattern,
  onDelete,
  onDeleteFormulaPattern,
  onEditChartType,
  onEditDescription,
  onEditFormulaDefaultPattern,
  onEditFormulaPattern,
  onEditFormulaPayload,
  onEditName,
  onEditStatus,
  onEditTrendLine,
}) => {
  const { formatMessage } = useIntl();

  const {
    statusPermissions: { canBeEdited },
  } = useContext(ChartSettingsContext);

  const {
    loaders: { deleteChartLoader },
  } = useContext(DashboardSectionsContext);

  const handleChangeTypeToNumeric = () =>
    onEditChartType(ChartType.NUMERIC_BAR_CHART);

  const handleChangeTypeToPercentage = () =>
    onEditChartType(ChartType.PERCENTAGE_BAR_CHART);

  const handleTrendLineChange = () => onEditTrendLine(!chart.trendLine);

  return (
    <FullWidthContainer>
      <ChartSettingsTopSection
        chartStatus={chart.status}
        chartType={chart.chartType}
        isDeleting={deleteChartLoader}
        onChangeStatus={onEditStatus}
        onDelete={onDelete}
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
              checked={chart.chartType === ChartType.NUMERIC_BAR_CHART}
              onClick={handleChangeTypeToNumeric}
              mr={9}
            />
            <Text mr={18}>
              {formatMessage(messages.chartSettingsChartValuesNumericOption)}
            </Text>

            <Radio
              disabled={!canBeEdited}
              checked={chart.chartType === ChartType.PERCENTAGE_BAR_CHART}
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
                  chartType: chart.chartType,
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
              checked={chart.trendLine}
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
          {chart.formula.patterns.map((pattern, index) => (
            <BarChartFormulaPattern
              key={`Pattern-${index}-Chart-${chart.id}`}
              pattern={pattern}
              onEdit={onEditFormulaPattern(index)}
              onDelete={onDeleteFormulaPattern(index)}
            />
          ))}
          <BarChartFormulaOtherPattern
            key={`OtherPattern-Chart-${chart.id}`}
            pattern={chart.formula.defaultPattern}
            onEdit={onEditFormulaDefaultPattern}
          />
        </Col>
      </Row>

      <Row mt={36}>
        <Col>
          <DashedButton
            disabled={!canBeEdited}
            onClick={onAddFormulaPattern}
            loading={addPatternLoader}
          >
            {formatMessage(messages.addNewCase)}
          </DashedButton>
        </Col>
      </Row>
    </FullWidthContainer>
  );
};

BarChartSettings.propTypes = {
  chart: PropTypes.object,
  addPatternLoader: PropTypes.bool,
  onAddFormulaPattern: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteFormulaPattern: PropTypes.func,
  onEditChartType: PropTypes.func,
  onEditDescription: PropTypes.func,
  onEditFormulaDefaultPattern: PropTypes.func,
  onEditFormulaPattern: PropTypes.func,
  onEditFormulaPayload: PropTypes.func,
  onEditName: PropTypes.func,
  onEditStatus: PropTypes.func,
  onEditTrendLine: PropTypes.func,
};

export default memo(BarChartSettings);
