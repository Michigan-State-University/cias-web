import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  ChartType,
  deleteChartRequest,
  editChartRequest,
} from 'global/reducers/dashboardSections';

import PieChartSettings from './PieChartSettings';

import { SettingsContainer } from '../../../styled';

const ChartSettings = ({ chart, editChart, deleteChart }) => {
  const wrapper = component => (
    <SettingsContainer>{component}</SettingsContainer>
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

  const onDelete = useCallback(
    () => deleteChart(chart.id, chart.dashboardSectionId),
    [chart.id, chart.dashboardSectionId],
  );

  switch (chart.chartType) {
    case ChartType.PIE_CHART:
      return wrapper(
        <PieChartSettings onEdit={onEdit} onDelete={onDelete} chart={chart} />,
      );
    case ChartType.BAR_CHART:
    default:
      return null;
  }
};

ChartSettings.propTypes = {
  chart: PropTypes.object,
  editChart: PropTypes.func,
  deleteChart: PropTypes.func,
};

const mapDispatchToProps = {
  editChart: editChartRequest,
  deleteChart: deleteChartRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChartSettings);
