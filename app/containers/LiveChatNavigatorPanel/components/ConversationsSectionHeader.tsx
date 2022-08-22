import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import SectionHeader from './SectionHeader';
import i18nMessages from '../messages';

export type Props = {
  isArchive: boolean;
};

const ConversationsSectionHeader = ({ isArchive }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <SectionHeader
      title={formatMessage(
        i18nMessages[isArchive ? 'archivedMessages' : 'inbox'],
      )}
    />
  );
};

export default memo(ConversationsSectionHeader);
