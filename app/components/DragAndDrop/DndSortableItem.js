import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { DRAGGING_ITEM_OPACITY, ITEM_OPACITY } from './constants';

const Component = ({ children, item, id }) => {
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

  const dragHandleProps = useMemo(
    () => ({
      ...attributes,
      ...listeners,
    }),
    [attributes, listeners],
  );

  return (
    <div ref={setNodeRef} style={style}>
      {children({ item, dragHandleProps, isDragging, isOverlay: false })}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.func,
  item: PropTypes.object,
  id: PropTypes.string,
};

Component.defaultProps = {};

export const DndSortableItem = memo(Component);
