import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  ChartType,
  deleteChartRequest,
  editChartRequest,
} from 'global/reducers/dashboardSections';

import ActionIcon from 'components/ActionIcon';
import { Col, Row } from 'components/ReactGridSystem';

import BarChartSettings from './BarChartSettings';
import PieChartSettings from './PieChartSettings';

import {
  DashboardSectionsContext,
  generateNewPatternForChartType,
} from '../constants';
import { SettingsContainer } from '../../../styled';

const ChartSettings = ({ chart, deleteChart, editChart, onClose }) => {
  const [isAddingPattern, setIsAddingPattern] = useState(false);

  const {
    loaders: { editChartLoader },
  } = useContext(DashboardSectionsContext);

  useEffect(() => {
    if (isAddingPattern && !editChartLoader) setIsAddingPattern(false);
  }, [editChartLoader]);

  const wrapper = component => (
    <SettingsContainer>
      <Row>
        <Col align="end" mb={30}>
          <ActionIcon onClick={onClose} mr={0} />
        </Col>
      </Row>
      {component}
    </SettingsContainer>
  );

  const onDelete = useCallback(
    () => deleteChart(chart.id, chart.dashboardSectionId),
    [chart.id, chart.dashboardSectionId],
  );

  const onEdit = useCallback(
    field => value =>
      editChart({
        id: chart.id,
        dashboardSectionId: chart.dashboardSectionId,
        [field]: value,
      }),
    [chart.id, chart.dashboardSectionId],
  );

  const onEditName = useCallback(onEdit('name'), [chart.name]);

  const onEditStatus = useCallback(onEdit('status'), [chart.status]);

  const onEditDescription = useCallback(onEdit('description'), [
    chart.description,
  ]);

  const onEditChartType = useCallback(onEdit('chartType'), [chart.chartType]);

  const onEditTrendLine = useCallback(onEdit('trendLine'), [chart.trendLine]);

  const onEditFormula = useCallback(
    field => value => onEdit('formula')({ ...chart.formula, [field]: value }),
    [chart.formula],
  );

  const onEditFormulaPayload = useCallback(onEditFormula('payload'), [
    chart.formula.payload,
  ]);

  const onEditFormulaPattern = useCallback(
    index => newPattern =>
      onEditFormula('patterns')(
        chart.formula.patterns.map((pattern, i) => {
          if (index === i) return newPattern;

          return pattern;
        }),
      ),
    [chart.formula.patterns],
  );

  const onEditFormulaDefaultPattern = useCallback(
    pattern => onEditFormula('defaultPattern')(pattern),
    [chart.formula.defaultPattern],
  );

  const onDeleteFormulaPattern = useCallback(
    index => () =>
      onEditFormula('patterns')(
        chart.formula.patterns.filter((_, i) => i !== index),
      ),
    [chart.formula.patterns],
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
  }, [chart.formula.patterns]);

  switch (chart.chartType) {
    case ChartType.PIE_CHART:
      return wrapper(
        <PieChartSettings
          chart={chart}
          addPatternLoader={isAddingPattern}
          onAddFormulaPattern={onAddFormulaPattern}
          onDelete={onDelete}
          onDeleteFormulaPattern={onDeleteFormulaPattern}
          onEditFormulaDefaultPattern={onEditFormulaDefaultPattern}
          onEditDescription={onEditDescription}
          onEditFormulaPattern={onEditFormulaPattern}
          onEditFormulaPayload={onEditFormulaPayload}
          onEditName={onEditName}
          onEditStatus={onEditStatus}
        />,
      );
    case ChartType.NUMERIC_BAR_CHART:
    case ChartType.PERCENTAGE_BAR_CHART:
      return wrapper(
        <BarChartSettings
          chart={chart}
          addPatternLoader={isAddingPattern}
          onAddFormulaPattern={onAddFormulaPattern}
          onDelete={onDelete}
          onEditChartType={onEditChartType}
          onDeleteFormulaPattern={onDeleteFormulaPattern}
          onEditFormulaDefaultPattern={onEditFormulaDefaultPattern}
          onEditDescription={onEditDescription}
          onEditFormulaPattern={onEditFormulaPattern}
          onEditFormulaPayload={onEditFormulaPayload}
          onEditName={onEditName}
          onEditStatus={onEditStatus}
          onEditTrendLine={onEditTrendLine}
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
};

const mapDispatchToProps = {
  deleteChart: deleteChartRequest,
  editChart: editChartRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChartSettings);
