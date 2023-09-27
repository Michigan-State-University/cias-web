import React, { memo, ReactNode, useRef, useState } from 'react';
import { sanitize } from 'dompurify';

import Tooltip from 'components/Tooltip';
import Row from 'components/Row';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { StyledEllipsisText, TruncatedMarkup } from './styled';

export type HtmlProps = {
  isHtml: true;
  text: string;
};

export type NonHtmlProps = {
  isHtml?: false;
  text: ReactNode;
};

export type CommonProps = {
  id?: string;
  dataFor?: string;
  lines?: number;
  width?: number;
} & Record<string, unknown>;

export type Props = CommonProps & (HtmlProps | NonHtmlProps);

// IF THE TEXT LENGTH IS NOT CALCULATED CORRECTLY AND IT
// IS DISPLAYED IN A DIFFERENT NUMBER OF LINES THEN TRY
// SETTING max-width: 0 TO THE PARENT OF THIS COMPONENT
const EllipsisText = ({
  text,
  id,
  dataFor,
  lines = 1,
  width,
  isHtml,
  ...props
}: Props) => {
  const ref = useRef(null);

  const [allowTooltip, setAllowTooltip] = useState(false);

  const onTruncate = (isTruncated: boolean) => {
    setAllowTooltip(isTruncated);
  };

  const plainText = isHtml ? htmlToPlainText(text) : text;
  const purifiedHtmlText = isHtml ? sanitize(text) : '';

  return (
    <Row width="100%">
      <Tooltip
        visible={allowTooltip}
        text={!isHtml ? plainText : undefined}
        content={
          isHtml ? (
            <span dangerouslySetInnerHTML={{ __html: purifiedHtmlText }} />
          ) : undefined
        }
        id={id ?? plainText ?? ''}
        display="inline"
        width="100%"
      >
        <>
          <StyledEllipsisText
            ref={ref}
            data-tip={plainText}
            data-for={dataFor ?? plainText ?? ''}
            lines={isHtml ? 1 : lines}
            onTruncate={onTruncate}
            width={width}
            $styleProps={isHtml ? { hidden: true, ...props } : props}
          >
            {plainText}
          </StyledEllipsisText>
          {isHtml && (
            <TruncatedMarkup
              width={width}
              dangerouslySetInnerHTML={{ __html: purifiedHtmlText }}
              $styleProps={props}
            />
          )}
        </>
      </Tooltip>
    </Row>
  );
};

export default memo(EllipsisText);
