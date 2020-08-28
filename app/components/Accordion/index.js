import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Reorder from 'react-reorder';

import { AccordionContainer } from './styled';
import Collapse from './Collapse';

const Accordion = ({
  children,
  onHide,
  onOpen,
  onReorder,
  opened,
  setOpened,
  onDelete,
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
      <div key={`accordion-${index}`}>
        <Collapse
          onToggle={handleToggle}
          isOpened={opened === index}
          label={label}
          color={color}
          onDelete={handleDelete}
        >
          {content}
        </Collapse>
      </div>
    );
  };

  if (Array.isArray(children))
    return (
      <AccordionContainer>
        <Reorder
          holdTime={125}
          reorderId="blocks-list"
          onReorder={onReorder}
          disabled={!onReorder}
        >
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
  onOpen: PropTypes.func,
  onReorder: PropTypes.func,
  opened: PropTypes.number,
  setOpened: PropTypes.func,
  onDelete: PropTypes.func,
};

Accordion.defaultProps = {};

export default memo(Accordion);
