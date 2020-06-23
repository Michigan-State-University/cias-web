import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { blockTypeToColorMap } from 'models/Narrator/BlockTypes';

import { AccordionContainer } from './styled';
import Collapse from './Collapse';

const Accordion = ({ children }) => {
  const [opened, setOpened] = useState(-1);

  const renderCollapse = (child, index) => {
    const { children: content, type } = child.props;

    return (
      <Collapse
        key={`accordion-${index}`}
        onToggle={() => {
          if (opened === index) setOpened(-1);
          else setOpened(index);
        }}
        isOpened={opened === index}
        label={`${index + 1}. ${type}`}
        color={blockTypeToColorMap[type]}
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
