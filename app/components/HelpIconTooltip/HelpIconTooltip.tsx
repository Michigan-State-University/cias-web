import React, { FC, ReactNode } from 'react';
import { Markup } from 'interweave';

import QuestionMark from 'assets/svg/grey-question-mark.svg';

import Row from 'components/Row';
import { Tooltip } from 'components/Tooltip';

export type Props = {
  id: string;
  tooltipContent: ReactNode;
};

export const HelpIconTooltip: FC<Props> = ({
  children,
  id,
  tooltipContent,
}) => (
  <Row align="center" gap={8}>
    {children}
    {tooltipContent && (
      <Tooltip
        id={id}
        content={
          typeof tooltipContent === 'string' ? (
            <Markup content={tooltipContent} />
          ) : (
            tooltipContent
          )
        }
        icon={QuestionMark}
        allowClicksOnContent
      />
    )}
  </Row>
);
