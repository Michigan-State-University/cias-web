import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { DndSortableItem } from './DndSortableItem';
import { reorderItems, selectId } from './utils';

const Component = ({ items, selector, onDragEnd, onDragStart, children }) => {
  const handleDragStart = e => {
    onDragStart(e);
  };

  const handleDragEnd = e => {
    const { active, over } = e;

    const { items: reorderedItems, hasChanged } = reorderItems(
      items,
      active?.id,
      over?.id,
      selector,
    );

    onDragEnd(e, reorderedItems, hasChanged);
  };

  const ids = useMemo(() => items.map(item => selectId(item, selector)), [
    items,
    selector,
  ]);

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
    </DndContext>
  );
};

Component.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  selector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  children: PropTypes.func,
};

Component.defaultProps = {
  selector: 'id',
};

export const DndSortable = memo(Component);
