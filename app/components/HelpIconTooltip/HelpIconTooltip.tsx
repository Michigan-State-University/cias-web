import React, { FC } from 'react';
import { Markup } from 'interweave';

import QuestionMark from 'assets/svg/grey-question-mark.svg';

import Row from 'components/Row';
import { Tooltip } from 'components/Tooltip';

export type Props = {
  id: string;
  hide?: boolean;
  tooltipContent: string;
};

export const HelpIconTooltip: FC<Props> = ({
  children,
  id,
  hide,
  tooltipContent,
}) => (
  <Row align="center" gap={8}>
    {children}
    {!hide && (
      <Tooltip
        id={id}
        content={<Markup content={tooltipContent} />}
        icon={QuestionMark}
        allowClicksOnContent
      />
    )}
  </Row>
);
