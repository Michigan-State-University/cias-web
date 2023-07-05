import React, { FC, ReactNode } from 'react';
import { Markup } from 'interweave';

import QuestionMark from 'assets/svg/grey-question-mark.svg';

import Row from 'components/Row';
import { Tooltip } from 'components/Tooltip';

export type WithMarkupProps = {
  useMarkup: true;
  tooltipContent: string;
};

export type WithoutMarkupProps = {
  useMarkup?: false;
  tooltipContent: ReactNode;
};

export type CommonProps = {
  id: string;
  hide?: boolean;
};

export type Props = CommonProps & (WithMarkupProps | WithoutMarkupProps);

export const HelpIconTooltip: FC<Props> = ({
  children,
  id,
  hide,
  tooltipContent,
  useMarkup,
}) => (
  <Row align="center" gap={8}>
    {children}
    {!hide && (
      <Tooltip
        id={id}
        content={
          useMarkup ? <Markup content={tooltipContent} /> : tooltipContent
        }
        icon={QuestionMark}
        allowClicksOnContent
      />
    )}
  </Row>
);
