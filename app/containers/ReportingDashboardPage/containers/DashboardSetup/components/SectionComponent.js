import React, { memo, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  editDashboardSectionRequest,
  addChartRequest,
  selectChartAction,
  reorderChartsRequest,
} from 'global/reducers/dashboardSections';

import { Col, Row } from 'components/ReactGridSystem';
import SidePanel from 'components/SidePanel';

import AddChart from './AddChart';
import SectionUI from './SectionUI';
import ChartSettings from './ChartSettings';

import { DashboardSectionsContext } from '../constants';
import { FullWidthContainer } from '../../../styled';
import { orderCharts } from '../utils';
import DraggableChartsParent from './DraggableChartsParent';
import DraggableChartComponent from './DraggableChartComponent';

const SectionComponent = ({
  section: { id, organizationId, name, description, charts },
  editDashboardSection,
  index,
  addChart,
  selectChart,
  draggableHandler,
  reorderCharts,
}) => {
  const { selectedChart, fromDashboardView } = useContext(
    DashboardSectionsContext,
  );

  const closeSettings = useCallback(() => selectChart(), []);

  const onUpdate = useCallback(
    field => value =>
      editDashboardSection(
        {
          organizationId,
          [field]: value,
        },
        id,
      ),
    [id, organizationId],
  );

  const onAddChart = useCallback(type => addChart(id, type), [id]);

  const onSelectChart = useCallback(
    chartId => {
      if (!fromDashboardView) selectChart(id, chartId);
    },
    [id],
  );

  const onChartsDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const chartOrdered = orderCharts(charts, active.id, over.id);

      reorderCharts(id, chartOrdered);
    }
  };

  return (
    <>
      <SectionUI
        showDivider={index !== 0}
        name={name}
        description={description}
        onDescriptionChange={onUpdate('description')}
        onNameChange={onUpdate('name')}
        fromDashboardView={fromDashboardView}
        draggableHandler={draggableHandler}
      />

      {!fromDashboardView && (
        <Row justify="start">
          <Col xs="content" mb={40}>
            <AddChart addChart={onAddChart} />
          </Col>
        </Row>
      )}
      <FullWidthContainer>
        <Row mb={40} justify="start">
          <DraggableChartsParent
            onDragEnd={onChartsDragEnd}
            charts={charts}
            fromDashboardView={fromDashboardView}
          >
            {charts.map(chart => {
              const isSelected =
                selectedChart?.id === chart.id &&
                selectedChart?.dashboardSectionId === id;

              return (
                <DraggableChartComponent
                  key={`Chart-${chart.id}-Section-${id}`}
                  fromDashboardView={fromDashboardView}
                  chart={chart}
                  onClick={onSelectChart}
                  isSelected={isSelected}
                />
              );
            })}
          </DraggableChartsParent>
        </Row>
      </FullWidthContainer>

      {!fromDashboardView && (
        <SidePanel isOpen={Boolean(selectedChart)} style={{ width: 500 }}>
          <ChartSettings onClose={closeSettings} chart={selectedChart} />
        </SidePanel>
      )}
    </>
  );
};

SectionComponent.propTypes = {
  section: PropTypes.object,
  editDashboardSection: PropTypes.func,
  addChart: PropTypes.func,
  selectChart: PropTypes.func,
  reorderCharts: PropTypes.func,
  index: PropTypes.number,
  draggableHandler: PropTypes.node,
};

const mapDispatchToProps = {
  editDashboardSection: editDashboardSectionRequest,
  addChart: addChartRequest,
  selectChart: selectChartAction,
  reorderCharts: reorderChartsRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SectionComponent);
