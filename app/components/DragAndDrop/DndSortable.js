import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { DndSortableItem } from './DndSortableItem';
import { reorderItems, selectId } from './utils';
import { EMPTY_OBJECT } from './constants';

const Component = ({ items, selector, onDragEnd, onDragStart, children }) => {
  const [draggableIem, setDraggableItem] = useState(null);

  const handleDragStart = (e) => {
    setDraggableItem(e.active.data.current);

    if (onDragStart) onDragStart(e);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    const { items: reorderedItems, hasChanged } = reorderItems(
      items,
      active?.id,
      over?.id,
      selector,
    );

    setDraggableItem(null);
    onDragEnd(e, reorderedItems, hasChanged);
  };

  const ids = useMemo(
    () => items.map((item) => selectId(item, selector)),
    [items, selector],
  );

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
    >
      <SortableContext items={ids}>
        {items.map((item, index) => {
          const itemId = ids[index];

          return (
            <DndSortableItem
              key={`sortable-item-${index}-${itemId}`}
              item={item}
              id={itemId}
            >
              {children}
            </DndSortableItem>
          );
        })}
      </SortableContext>

      <DragOverlay>
        {draggableIem &&
          children({
            item: draggableIem,
            dragHandleProps: EMPTY_OBJECT,
            isDragging: true,
            isOverlay: true,
          })}
      </DragOverlay>
    </DndContext>
  );
};

Component.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onDragEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  children: PropTypes.func.isRequired,
};

Component.defaultProps = {
  selector: 'id',
};

export const DndSortable = memo(Component);
