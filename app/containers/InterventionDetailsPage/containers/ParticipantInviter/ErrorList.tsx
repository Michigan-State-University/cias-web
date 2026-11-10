import React, { FC, ReactNode } from 'react';

import warningIcon from 'assets/svg/warning-circle.svg';
import { themeColors } from 'theme';

import { AlertType, getBackgroundColorByType } from 'components/Alert';
import Box from 'components/Box';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Text from 'components/Text';

export type ErrorListItem = {
  key: string;
  text: string;
  dataCy?: string;
};

export type Props = {
  header: ReactNode;
  items: ErrorListItem[];
  dataCy?: string;
};

export const ErrorList: FC<Props> = ({ header, items, dataCy }) => (
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
    {/* Capped so a long list of rows cannot push the dialog buttons away. */}
    <Box maxHeight={200} overflow="auto">
      <Column gap={4}>
        {items.map(({ key, text, dataCy: itemDataCy }) => (
          <Row key={key} gap={8} align="start">
            <Text fontSize={13} lineHeight={1.4} flexShrink={0}>
              •
            </Text>
            <Text fontSize={13} lineHeight={1.4} data-cy={itemDataCy}>
              {text}
            </Text>
          </Row>
        ))}
      </Column>
    </Box>
  </Column>
);
