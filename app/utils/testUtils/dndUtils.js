import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React from 'react';

export const withDroppable = (component) => (
  <DragDropContext>
    <Droppable droppableId="TEST">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {component}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);
