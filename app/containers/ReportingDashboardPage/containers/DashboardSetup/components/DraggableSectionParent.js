import React, { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import reorderIcon from 'assets/svg/reorder-hand.svg';

import Img from 'components/Img';
import SectionComponent from './SectionComponent';
import { DashboardSectionsContext } from '../constants';

const DraggableSectionParent = ({
  onDragEnd,
  children,
  dashboardSections,
  fromDashboardView,
}) => {
  const [draggingSectionId, setDraggingSectionId] = useState(null);
  const { setShouldAnimateCharts } = useContext(DashboardSectionsContext);

  const onDragStart = e => {
    setShouldAnimateCharts(false);
    setDraggingSectionId(e.active.id);
  };

  const onDragEndCallback = () => {
    setShouldAnimateCharts(true);
    setDraggingSectionId(null);
  };

  const draggingDashboardSection = useMemo(
    () => dashboardSections.find(({ id }) => id === draggingSectionId),
    [draggingSectionId],
  );

  const dragHandle = useMemo(
    () => <Img ml={10} src={reorderIcon} disabled={false} alt="drag-icon" />,
    [],
  );

  return (
    <DndContext
      onDragOver={onDragEnd}
      onDragEnd={onDragEndCallback}
      onDragStart={onDragStart}
    >
      <SortableContext strategy={() => {}} items={dashboardSections}>
        {children}
      </SortableContext>
      <DragOverlay>
        {draggingDashboardSection && (
          <SectionComponent
            draggableHandler={dragHandle}
            section={draggingDashboardSection}
            fromDashboardView={fromDashboardView}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

DraggableSectionParent.propTypes = {
  onDragEnd: PropTypes.func,
  children: PropTypes.node,
  dashboardSections: PropTypes.array,
  fromDashboardView: PropTypes.bool,
};

export default DraggableSectionParent;
