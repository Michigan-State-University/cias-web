import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import i18nMessages from '../messages';
import SectionHeader from './SectionHeader';

const ConversationsSectionHeader = () => {
  const { formatMessage } = useIntl();
  return <SectionHeader title={formatMessage(i18nMessages.inbox)} />;
};

export default memo(ConversationsSectionHeader);
