import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  ChartTypeDto,
  deleteChartRequest,
  editChartRequest,
  StatusPermissions,
  copyChartRequest,
} from 'global/reducers/dashboardSections';

import ActionIcon from 'components/ActionIcon';
import { Col, Row } from 'components/ReactGridSystem';

import BarChartSettings from './BarChartSettings';
import PieChartSettings from './PieChartSettings';

import {
  ChartSettingsContext,
  DashboardSectionsContext,
  generateNewPatternForChartType,
} from '../constants';
import { SettingsContainer } from '../../../styled';

const ChartSettings = ({
  chart,
  deleteChart,
  editChart,
  onClose,
  copyChart,
}) => {
  const [isAddingPattern, setIsAddingPattern] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const statusPermissions = StatusPermissions(chart.status);

  const {
    loaders: { editChartLoader },
  } = useContext(DashboardSectionsContext);

  useEffect(() => {
    if (isAddingPattern && !editChartLoader) setIsAddingPattern(false);

    if (isChangingStatus && !editChartLoader) setIsChangingStatus(false);
  }, [editChartLoader]);

  const contextValue = useMemo(
    () => ({ statusPermissions }),
    [statusPermissions],
  );

  const wrapper = (component) => (
    <ChartSettingsContext.Provider value={contextValue}>
      <SettingsContainer>
        <Row>
          <Col align="end" mb={30}>
            <ActionIcon onClick={onClose} mr={0} />
          </Col>
        </Row>
        {component}
      </SettingsContainer>
    </ChartSettingsContext.Provider>
  );

  const onDelete = useCallback(
    () => deleteChart(chart.id, chart.dashboardSectionId),
    [chart.id, chart.dashboardSectionId],
  );

  const onEdit = useCallback(
    (field) => (value) =>
      editChart({
        id: chart.id,
        dashboardSectionId: chart.dashboardSectionId,
        [field]: value,
      }),
    [chart.id, chart.dashboardSectionId],
  );

  const onEditName = useCallback(onEdit('name'), [chart.name, onEdit]);

  const onEditStatus = useCallback(
    (value) => {
      setIsChangingStatus(true);

      onEdit('status')(value);
    },
    [chart.status, onEdit],
  );

  const onEditDescription = useCallback(onEdit('description'), [
    chart.description,
    onEdit,
  ]);

  const onEditChartType = useCallback(onEdit('chartType'), [
    chart.chartType,
    onEdit,
  ]);

  const onEditIntervalType = useCallback(onEdit('intervalType'), [
    chart.intervalType,
    onEdit,
  ]);

  const onEditTrendLine = useCallback(onEdit('trendLine'), [
    chart.trendLine,
    onEdit,
  ]);

  const onEditFormula = useCallback(
    (field) => (value) =>
      onEdit('formula')({ ...chart.formula, [field]: value }),
    [chart.formula, onEdit],
  );

  const onEditFormulaPayload = useCallback(onEditFormula('payload'), [
    chart.formula.payload,
    onEditFormula,
  ]);

  const onEditFormulaPattern = useCallback(
    (index) => (newPattern) =>
      onEditFormula('patterns')(
        chart.formula.patterns.map((pattern, i) => {
          if (index === i) return newPattern;

          return pattern;
        }),
      ),
    [chart.formula.patterns, onEditFormula],
  );

  const onEditFormulaDefaultPattern = useCallback(
    (pattern) => onEditFormula('defaultPattern')(pattern),
    [chart.formula.defaultPattern, onEditFormula],
  );

  const onDeleteFormulaPattern = useCallback(
    (index) => () =>
      onEditFormula('patterns')(
        chart.formula.patterns.filter((_, i) => i !== index),
      ),
    [chart.formula.patterns, onEditFormula],
  );

  const onAddFormulaPattern = useCallback(() => {
    setIsAddingPattern(true);

    onEditFormula('patterns')([
      ...chart.formula.patterns,
      generateNewPatternForChartType(
        chart.chartType,
        chart.formula.patterns.length,
      ),
    ]);
  }, [chart.chartType, chart.formula.patterns, onEditFormula]);

  const onEditDateRange = useCallback(
    (dateRangeStart, dateRangeEnd) =>
      editChart({
        id: chart.id,
        dashboardSectionId: chart.dashboardSectionId,
        dateRangeStart,
        dateRangeEnd,
      }),
    [
      chart.id,
      chart.dashboardSectionId,
      chart.dateRangeStart,
      chart.dateRangeEnd,
      editChart,
    ],
  );

  const onCopyChart = useCallback(() => {
    copyChart(chart.id);
  }, [chart.id]);

  switch (chart.chartType) {
    case ChartTypeDto.PIE_CHART:
      return wrapper(
        <PieChartSettings
          chart={chart}
          addPatternLoader={isAddingPattern}
          changeStatusLoader={isChangingStatus}
          onAddFormulaPattern={onAddFormulaPattern}
          onDelete={onDelete}
          onDeleteFormulaPattern={onDeleteFormulaPattern}
          onEditDescription={onEditDescription}
          onEditFormulaDefaultPattern={onEditFormulaDefaultPattern}
          onEditFormulaPattern={onEditFormulaPattern}
          onEditFormulaPayload={onEditFormulaPayload}
          onEditName={onEditName}
          onEditStatus={onEditStatus}
          onEditDateRange={onEditDateRange}
          onCopyChart={onCopyChart}
        />,
      );
    case ChartTypeDto.NUMERIC_BAR_CHART:
    case ChartTypeDto.PERCENTAGE_BAR_CHART:
      return wrapper(
        <BarChartSettings
          chart={chart}
          changeStatusLoader={isChangingStatus}
          onDelete={onDelete}
          onEditChartType={onEditChartType}
          onEditIntervalType={onEditIntervalType}
          onEditDescription={onEditDescription}
          onEditFormulaPattern={onEditFormulaPattern}
          onEditFormulaPayload={onEditFormulaPayload}
          onEditName={onEditName}
          onEditStatus={onEditStatus}
          onEditTrendLine={onEditTrendLine}
          onCopyChart={onCopyChart}
        />,
      );
    default:
      return null;
  }
};

ChartSettings.propTypes = {
  chart: PropTypes.object,
  deleteChart: PropTypes.func,
  editChart: PropTypes.func,
  onClose: PropTypes.func,
  copyChart: PropTypes.func,
};

const mapDispatchToProps = {
  deleteChart: deleteChartRequest,
  editChart: editChartRequest,
  copyChart: copyChartRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(ChartSettings);
