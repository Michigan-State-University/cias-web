import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import scrollByRef from 'utils/scrollByRef';

import { StyledTextBlock } from './styled';

const TextBlock = ({ text, isCurrent }) => {
  const textBlockRef = useRef();

  useEffect(() => {
    if (isCurrent) scrollByRef(textBlockRef, { block: 'center' });
  }, [isCurrent]);

  return (
    <StyledTextBlock ref={textBlockRef} isCurrent={isCurrent}>
      {text}
    </StyledTextBlock>
  );
};

TextBlock.propTypes = {
  text: PropTypes.string,
  isCurrent: PropTypes.bool,
};

export default memo(TextBlock);
