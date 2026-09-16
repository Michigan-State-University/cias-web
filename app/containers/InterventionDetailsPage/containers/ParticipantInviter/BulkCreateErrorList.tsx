import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import warningIcon from 'assets/svg/warning-circle.svg';
import { themeColors } from 'theme';

import { AlertType } from 'components/Alert';
import { getBackgroundColorByType } from 'components/Alert/utils';
import Box from 'components/Box';
import Column from 'components/Column';
import Icon from 'components/Icon';
import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';
import { BulkCreateErrorEntry } from './types';
import bulkCreateErrorCodeMessages from './bulkCreateErrorCodeMessages';

type Props = { errors: BulkCreateErrorEntry[] };

const formatEntry = (
  entry: BulkCreateErrorEntry,
  formatMessage: ReturnType<typeof useIntl>['formatMessage'],
): string => {
  const descriptor =
    bulkCreateErrorCodeMessages[entry.code] ??
    bulkCreateErrorCodeMessages.unknown;
  const values = {
    ...entry,
    row: entry.row != null ? entry.row + 1 : '—',
    field: entry.field ?? '',
    code: entry.code,
  };
  return formatMessage(descriptor, values);
};

export const BulkCreateErrorList: FC<Props> = ({ errors }) => {
  const { formatMessage } = useIntl();

  return (
    <Column
      borderRadius="8px"
      py={12}
      px={16}
      gap={8}
      background={getBackgroundColorByType(AlertType.WARNING)}
    >
      <Row gap={8} align="center">
        <Icon src={warningIcon} stroke={themeColors.text} />
        <Text fontWeight="bold" fontSize={14} lineHeight={1.3}>
          {formatMessage(messages.bulkCreateErrorListHeader, {
            count: errors.length,
          })}
        </Text>
      </Row>
      <Box maxHeight={200} overflow="auto">
        <Column gap={4}>
          {errors.map((entry, idx) => (
            <Row
              key={`${entry.row ?? 'global'}-${entry.field ?? ''}-${entry.code}-${idx}`}
              gap={8}
              align="start"
            >
              <Text fontSize={13} lineHeight={1.4} flexShrink={0}>
                •
              </Text>
              <Text fontSize={13} lineHeight={1.4}>
                {formatEntry(entry, formatMessage)}
              </Text>
            </Row>
          ))}
        </Column>
      </Box>
    </Column>
  );
};
