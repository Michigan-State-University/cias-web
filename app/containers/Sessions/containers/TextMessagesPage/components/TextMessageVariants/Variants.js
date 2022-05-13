import React from 'react';
import PropTypes from 'prop-types';

import { DndSortable } from 'components/DragAndDrop';

import VariantItem from './VariantItem';

const Variants = ({ variants, disabled, selectedVariantId, onReorder }) => {
  const onDragEnd = (_, items, hasChanged) => {
    if (!hasChanged) return;

    const reorderedVatiants = items.map((section, index) => ({
      ...section,
      position: index,
    }));
    onReorder(reorderedVatiants);
  };

  return (
    <DndSortable items={variants} onDragEnd={onDragEnd}>
      {({ item, dragHandleProps }) => (
        <VariantItem
          disabled={disabled}
          key={`variant-${item.id}`}
          variant={item}
          index={item.position + 1}
          open={selectedVariantId === item.id}
          dragHandleProps={dragHandleProps}
        />
      )}
    </DndSortable>
  );
};

Variants.propTypes = {
  variants: PropTypes.array,
  disabled: PropTypes.bool,
  selectedVariantId: PropTypes.string,
  onReorder: PropTypes.func,
};
export default Variants;
