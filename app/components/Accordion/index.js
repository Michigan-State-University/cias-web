import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AccordionContainer } from './styled';
import Collapse from './Collapse';

const Accordion = ({ children }) => {
  const [opened, setOpened] = useState(-1);

  const handleToggle = index => () => {
    if (opened === index) setOpened(-1);
    else setOpened(index);
  };

  const renderCollapse = (child, index) => {
    const { children: content, label, color } = child.props;

    return (
      <Collapse
        key={`accordion-${index}`}
        onToggle={handleToggle(index)}
        isOpened={opened === index}
        label={label}
        color={color}
      >
        {content}
      </Collapse>
    );
  };

  if (Array.isArray(children))
    return (
      <AccordionContainer>{children.map(renderCollapse)}</AccordionContainer>
    );

  return <AccordionContainer>{renderCollapse(children, 0)}</AccordionContainer>;
};

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Accordion.defaultProps = {};

export default Accordion;
