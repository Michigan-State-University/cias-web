import React, { memo, useMemo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DRAGGING_ITEM_OPACITY, ITEM_OPACITY } from './constants';
import { TChildren, TDragHandleProps } from './types';

type Props<T> = {
  children: TChildren<T>;
  item: T;
  id: string;
  index: number;
};

const Component = <T,>({ children, item, id, index }: Props<T>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: item });

  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      transition,
      opacity: isDragging ? DRAGGING_ITEM_OPACITY : ITEM_OPACITY,
    }),
    [transform, transition, isDragging],
  );

  // @ts-ignore TS not supported - it doesn't allow exceptions to Record type
  const dragHandleProps: TDragHandleProps = useMemo(
    () => ({
      ...attributes,
      ...listeners,
    }),
    [attributes, listeners],
  );

  return (
    <div ref={setNodeRef} style={style}>
      {children({ item, dragHandleProps, isDragging, isOverlay: false, index })}
    </div>
  );
};

export const DndSortableItem = memo(Component) as typeof Component;
