import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Reorder from 'react-reorder';

import { AccordionContainer } from './styled';
import Collapse from './Collapse';

const Accordion = ({
  children,
  onHide,
  onOpen,
  accordionParentKey,
  onReorder,
}) => {
  const [opened, setOpened] = useState(-1);

  useEffect(() => {
    if (opened !== -1) onOpen(opened);
  }, [opened]);

  useEffect(() => {
    setOpened(-1);
  }, [accordionParentKey]);

  const handleToggle = index => () => {
    let newIndex = index;
    if (opened === index) newIndex = -1;
    if (opened !== -1) onHide(opened);
    setOpened(newIndex);
  };

  const renderCollapse = (child, index) => {
    const { children: content, label, color, onDelete } = child.props;

    return (
      <div>
        <Collapse
          key={`accordion-${index}`}
          onToggle={handleToggle(index)}
          isOpened={opened === index}
          label={label}
          color={color}
          onDelete={onDelete}
        >
          {content}
        </Collapse>
      </div>
    );
  };

  if (Array.isArray(children))
    return (
      <AccordionContainer>
        <Reorder holdTime={125} reorderId="blocks-list" onReorder={onReorder}>
          {children.map(renderCollapse)}
        </Reorder>
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
  accordionParentKey: PropTypes.number,
  onOpen: PropTypes.func,
  onReorder: PropTypes.func,
};

Accordion.defaultProps = {};

export default memo(Accordion);
