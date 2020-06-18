import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AccordionContainer } from './styled';
import Collapse from './Collapse';

const Accordion = ({ children }) => {
  const [opened, setOpened] = useState(-1);

  const renderCollapse = (child, index) => {
    const { label, children: content, color } = child.props;

    return (
      <Collapse
        key={`accordion-${index}`}
        label={label}
        onToggle={() => {
          if (opened === index) setOpened(-1);
          else setOpened(index);
        }}
        color={color}
        isOpened={opened === index}
      >
        {content}
      </Collapse>
    );
  };

  if (Array.isArray(children))
    return (
      <AccordionContainer>
        {children.map((child, index) => renderCollapse(child, index))}
      </AccordionContainer>
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
