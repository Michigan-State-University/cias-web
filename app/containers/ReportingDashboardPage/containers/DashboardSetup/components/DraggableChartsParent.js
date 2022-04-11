import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import reorderIcon from 'assets/svg/reorder-hand.svg';

import { Col } from 'components/ReactGridSystem';
import Icon from 'components/Icon';

import ChartTileUI from './ChartTileUI';
const DraggableChartsParent = ({
  charts,
  onDragEnd,
  children,
  fromDashboardView,
}) => {
  const [draggingChartId, setDraggingChartId] = useState(null);

  const onDragStart = (e) => {
    setDraggingChartId(e.active.id);
  };

  const onDragEndCallback = (e) => {
    setDraggingChartId(null);
    onDragEnd(e);
  };

  const draggingChart = useMemo(
    () => charts.find(({ id }) => id === draggingChartId),
    [draggingChartId],
  );

  const dragHandle = useMemo(
    () => (
      <Col xs={1} align="end">
        <Icon src={reorderIcon} alt="reorder" />
      </Col>
    ),
    [],
  );

  return (
    <DndContext onDragEnd={onDragEndCallback} onDragStart={onDragStart}>
      <SortableContext items={charts}>{children}</SortableContext>
      <DragOverlay>
        {draggingChart && (
          <ChartTileUI
            fromDashboardView={fromDashboardView}
            chart={draggingChart}
            dragHandle={dragHandle}
            disableAnimation
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

DraggableChartsParent.propTypes = {
  charts: PropTypes.array,
  onDragEnd: PropTypes.func,
  children: PropTypes.node,
  fromDashboardView: PropTypes.bool,
};

export default DraggableChartsParent;
