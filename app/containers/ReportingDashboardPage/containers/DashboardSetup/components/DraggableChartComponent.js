import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import reorderIcon from 'assets/svg/reorder-hand.svg';

import { Col } from 'components/ReactGridSystem';
import Icon from 'components/Icon';
import ChartTileUI from './ChartTileUI';
import { DashboardSectionsContext } from '../constants';

const DraggableChartComponent = props => {
  const {
    chart: { id },
    fromDashboardView,
  } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: fromDashboardView });

  const { shouldAnimateCharts } = useContext(DashboardSectionsContext);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const preventClickActions = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragHandle = useMemo(
    () => (
      <Col
        onClick={preventClickActions}
        {...attributes}
        {...listeners}
        xs={1}
        align="end"
      >
        <Icon src={reorderIcon} alt="reorder" />
      </Col>
    ),
    [attributes, listeners],
  );

  return (
    <div ref={setNodeRef} style={style}>
      <ChartTileUI
        {...props}
        dragHandle={dragHandle}
        isDragging={isDragging}
        disableAnimation={!shouldAnimateCharts}
      />
    </div>
  );
};

DraggableChartComponent.propTypes = {
  chart: PropTypes.object,
  fromDashboardView: PropTypes.bool,
};

export default DraggableChartComponent;
