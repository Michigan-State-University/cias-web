import React, { memo, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import scrollByRef from 'utils/scrollByRef';

import { extractBlocksText } from './utils';
import { StyledTextBlock } from './styled';

const TextBlock = ({ block, isCurrent }) => {
  const textBlockRef = useRef();
  const text = useMemo(() => extractBlocksText(block), [block]);

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
  block: PropTypes.object,
  isCurrent: PropTypes.bool,
};

export default memo(TextBlock);
