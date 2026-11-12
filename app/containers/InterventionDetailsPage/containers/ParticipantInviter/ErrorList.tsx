import React, { FC, ReactNode } from 'react';

import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import Text from 'components/Text';

import { WarningPanel } from './WarningPanel';

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
  <WarningPanel header={header} dataCy={dataCy}>
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
  </WarningPanel>
);
