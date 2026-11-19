import React, { FC, ReactNode } from 'react';

import warningIcon from 'assets/svg/warning-circle.svg';
import { themeColors } from 'theme';

import { AlertType, getBackgroundColorByType } from 'components/Alert';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Text from 'components/Text';

export type Props = {
  header: ReactNode;
  children: ReactNode;
  dataCy?: string;
};

/** `children` sit directly in the `Column` so its `gap` applies between them. */
export const WarningPanel: FC<Props> = ({ header, children, dataCy }) => (
  <Column
    borderRadius="8px"
    py={12}
    px={16}
    gap={8}
    background={getBackgroundColorByType(AlertType.WARNING)}
    data-cy={dataCy}
  >
    <Row gap={8} align="center">
      <Icon src={warningIcon} stroke={themeColors.text} />
      <Text fontWeight="bold" fontSize={14} lineHeight={1.3}>
        {header}
      </Text>
    </Row>
    {children}
  </Column>
);
