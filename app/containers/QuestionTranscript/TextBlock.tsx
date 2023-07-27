import React, { memo, useEffect, useRef } from 'react';

import { LanguageDirection } from 'global/types/locale';

import scrollByRef from 'utils/scrollByRef';

import { StyledTextBlock } from './styled';

export type Props = {
  text: string;
  isCurrent: boolean;
  dir: LanguageDirection;
};

const TextBlock = ({ text, isCurrent, dir }: Props) => {
  const textBlockRef = useRef();

  useEffect(() => {
    if (isCurrent) scrollByRef(textBlockRef, { block: 'center' });
  }, [isCurrent]);

  return (
    <StyledTextBlock ref={textBlockRef} isCurrent={isCurrent} dir={dir}>
      {text}
    </StyledTextBlock>
  );
};

export default memo(TextBlock);
