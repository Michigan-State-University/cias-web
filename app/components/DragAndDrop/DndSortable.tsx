import React, { memo, useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import { DndSortableItem } from './DndSortableItem';
import { reorderItems, selectId, selectIndex } from './utils';
import { EMPTY_OBJECT } from './constants';
import { TChildren, TSelector } from './types';

type Props<T> = {
  children: TChildren<T>;
  items: T[];
  selector?: TSelector;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd: (
    event: DragEndEvent,
    reorderedItems: T[],
    hasChanged: boolean,
  ) => void;
};

const Component = <T,>({
  items,
  selector = 'id',
  onDragEnd,
  onDragStart,
  children,
}: Props<T>) => {
  const [draggableItem, setDraggableItem] = useState<{
    item: T;
    index: number;
  } | null>();

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;

    const draggableDataItem = active.data.current as T;
    const draggableDataIndex = selectIndex(items, active.id, selector);
    setDraggableItem({ item: draggableDataItem, index: draggableDataIndex });

    if (onDragStart) onDragStart(e);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over?.id) return;

    const { items: reorderedItems, hasChanged } = reorderItems(
      items,
      active.id,
      over.id,
      selector,
    );

    setDraggableItem(null);
    onDragEnd(e, reorderedItems, hasChanged);
  };

  const ids = useMemo(
    () => items.map((item, index) => selectId(item, selector, index)),
    [items, items.length, selector],
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
              index={index}
            >
              {children}
            </DndSortableItem>
          );
        })}
      </SortableContext>

      <DragOverlay>
        {draggableItem &&
          children({
            item: draggableItem.item,
            index: draggableItem.index,
            dragHandleProps: EMPTY_OBJECT,
            isDragging: true,
            isOverlay: true,
          })}
      </DragOverlay>
    </DndContext>
  );
};

export const DndSortable = memo(Component) as typeof Component;
