import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_MESSAGE_VARIANT_DEFAULT_STATE } from 'global/reducers/textMessages/constants';

import { DndSortable } from 'components/DragAndDrop';

import VariantItem from './VariantItem';

const Variants = ({
  variants,
  variantsStates,
  disabled,
  selectedVariantId,
  textMessageId,
  onReorder,
}) => {
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
          variantState={
            variantsStates.get(item.id) ?? TEXT_MESSAGE_VARIANT_DEFAULT_STATE
          }
          textMessageId={textMessageId}
        />
      )}
    </DndSortable>
  );
};

Variants.propTypes = {
  variants: PropTypes.array,
  variantsStates: PropTypes.instanceOf(Map),
  disabled: PropTypes.bool,
  selectedVariantId: PropTypes.string,
  textMessageId: PropTypes.string,
  onReorder: PropTypes.func,
};
export default Variants;
