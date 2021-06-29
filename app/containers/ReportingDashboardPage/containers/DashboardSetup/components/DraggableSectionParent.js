import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Box from 'components/Box';

const DraggableSectionParent = ({ onDragEnd, children }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="dashboard-sections-list" type="DASHBOARD_SECTIONS">
      {provided => (
        <Box width="100%" ref={provided.innerRef} {...provided.droppableProps}>
          {children}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  </DragDropContext>
);

DraggableSectionParent.propTypes = {
  onDragEnd: PropTypes.func,
  children: PropTypes.node,
};

export default DraggableSectionParent;
