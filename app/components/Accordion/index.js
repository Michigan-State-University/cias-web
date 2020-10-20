import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { reorderScope } from 'models/Intervention/ReorderScope';

import Box from 'components/Box';
import { AccordionContainer } from './styled';
import Collapse from '../Collapse';

const Accordion = ({
  children,
  onHide,
  onOpen,
  onReorder,
  opened,
  setOpened,
  onDelete,
  disabled,
}) => {
  useEffect(() => {
    if (opened !== -1) onOpen(opened);
  }, [opened]);

  const renderCollapse = (child, index) => {
    const { children: content, label, color } = child.props;

    const handleToggle = () => {
      let newIndex = index;
      if (opened === index) newIndex = -1;
      if (opened !== -1) onHide(opened);
      setOpened(newIndex);
    };

    const handleDelete = () => {
      onDelete(index);
    };

    return (
      <Collapse
        onToggle={handleToggle}
        isOpened={opened === index}
        label={label}
        color={color}
        onDelete={handleDelete}
        disabled={disabled}
      >
        {content}
      </Collapse>
    );
  };

  const onDragEnd = result => {
    const { source, destination } = result;

    if (destination) onReorder(source.index, destination.index);
  };

  const dragDisabled = !onReorder || disabled;

  if (Array.isArray(children))
    return (
      <AccordionContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            isDropDisabled={dragDisabled}
            droppableId="block-list"
            type={reorderScope.blocks}
          >
            {providedDroppable => (
              <div
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
              >
                {children.map((child, index) => (
                  <Draggable
                    isDragDisabled={dragDisabled}
                    key={`accordion-${index}`}
                    draggableId={`accordion-${index}`}
                    index={index}
                  >
                    {provided => (
                      <Box
                        mb={7}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {renderCollapse(child, index, dragDisabled)}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {providedDroppable.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </AccordionContainer>
    );

  return <AccordionContainer>{renderCollapse(children, 0)}</AccordionContainer>;
};

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  onHide: PropTypes.func,
  onOpen: PropTypes.func,
  onReorder: PropTypes.func,
  opened: PropTypes.number,
  setOpened: PropTypes.func,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

Accordion.defaultProps = {};

export default memo(Accordion);
