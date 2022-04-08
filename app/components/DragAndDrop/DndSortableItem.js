import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Component = ({ children, item, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, data: item });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const dragHandleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children({ item, dragHandleProps })}
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
