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

import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { reorder } from 'utils/reorder';
import ChartTileUI from './ChartTileUI';
import AddChart from './AddChart';
import SectionUI from './SectionUI';
import ChartSettings from './ChartSettings';

import { DashboardSectionsContext } from '../constants';
import { FullWidthContainer } from '../../../styled';

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
      const oldIndex = charts.findIndex(
        ({ id: chartId }) => chartId === active.id,
      );
      const newIndex = charts.findIndex(
        ({ id: chartId }) => chartId === over.id,
      );
      const newList = reorder(charts, oldIndex, newIndex);
      const chartOrdered = newList.map((section, chartIndex) => ({
        ...section,
        position: chartIndex + 1,
      }));

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
        <Col xs="content" mb={40}>
          <AddChart addChart={onAddChart} />
        </Col>
      )}
      <FullWidthContainer>
        <Row mb={40} justify="start">
          <DndContext onDragEnd={onChartsDragEnd}>
            <SortableContext items={charts}>
              {charts.map(chart => {
                const isSelected =
                  selectedChart?.id === chart.id &&
                  selectedChart?.dashboardSectionId === id;

                return (
                  <ChartTileUI
                    key={`Chart-${chart.id}-Section-${id}`}
                    fromDashboardView={fromDashboardView}
                    chart={chart}
                    onClick={onSelectChart}
                    isSelected={isSelected}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
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
