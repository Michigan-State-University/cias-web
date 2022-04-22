import React, { memo, useRef, useState } from 'react';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { StyledEllipsisText } from './styled';

type EllipsisTextType = {
  text: string;
  dataFor?: string;
  lines?: number;
  width?: number;
} & Record<string, unknown>;

const EllipsisText = ({
  text,
  dataFor,
  lines,
  width,
  ...props
}: EllipsisTextType) => {
  const ref = useRef(null);

  const [allowTooltip, setAllowTooltip] = useState(false);

  const onTruncate = (isTruncated: boolean) => {
    setAllowTooltip(isTruncated);
  };

  return (
    <Row width="100%">
      <Tooltip
        visible={allowTooltip}
        text={text}
        id={text ?? ''}
        display="inline"
        width="100%"
      >
        <StyledEllipsisText
          ref={ref}
          data-tip={text}
          data-for={dataFor ?? text ?? ''}
          lines={lines}
          onTruncate={onTruncate}
          width={width}
          $styleProps={props}
        >
          {text}
        </StyledEllipsisText>
      </Tooltip>
    </Row>
  );
};

export default memo(EllipsisText);
