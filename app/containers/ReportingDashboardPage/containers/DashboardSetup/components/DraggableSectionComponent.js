import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import reorderIcon from 'assets/svg/reorder-hand.svg';

import Img from 'components/Img';
import SectionComponent from './SectionComponent';

const DraggableSectionComponent = props => {
  const {
    section: { id },
    fromDashboardView,
  } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled: fromDashboardView });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const dragHandle = useMemo(
    () => (
      <Img
        ml={10}
        src={reorderIcon}
        disabled={false}
        {...attributes}
        {...listeners}
      />
    ),
    [attributes, listeners],
  );

  return (
    <div ref={setNodeRef} style={style}>
      <SectionComponent draggableHandler={dragHandle} {...props} />
    </div>
  );
};

DraggableSectionComponent.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  fromDashboardView: PropTypes.bool,
  section: PropTypes.object,
};

export default DraggableSectionComponent;
