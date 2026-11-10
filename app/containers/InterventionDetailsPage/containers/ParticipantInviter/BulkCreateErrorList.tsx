import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { ErrorList } from './ErrorList';
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
    <ErrorList
      header={formatMessage(messages.bulkCreateErrorListHeader, {
        count: errors.length,
      })}
      items={errors.map((entry, idx) => ({
        key: `${entry.row ?? 'global'}-${entry.field ?? ''}-${entry.code}-${idx}`,
        text: formatEntry(entry, formatMessage),
      }))}
    />
  );
};
