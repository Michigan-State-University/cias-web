import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import Img from 'components/Img';
import reorderIcon from 'assets/svg/reorder-hand.svg';
import SectionComponent from './SectionComponent';

const DraggableSectionComponent = props => {
  const {
    section: { id },
    index,
    fromDashboardView,
  } = props;
  return (
    <Draggable
      key={`group-${id}`}
      draggableId={id}
      index={index}
      isDragDisabled={fromDashboardView}
      type="DASHBOARD_SECTIONS"
    >
      {providedDraggable => {
        const draggableHandler = (
          <Img
            ml={10}
            src={reorderIcon}
            disabled={false}
            {...providedDraggable.dragHandleProps}
          />
        );
        return (
          <div
            ref={providedDraggable.innerRef}
            {...providedDraggable.draggableProps}
          >
            <SectionComponent draggableHandler={draggableHandler} {...props} />
          </div>
        );
      }}
    </Draggable>
  );
};

DraggableSectionComponent.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  fromDashboardView: PropTypes.bool,
  section: PropTypes.object,
};

export default DraggableSectionComponent;
