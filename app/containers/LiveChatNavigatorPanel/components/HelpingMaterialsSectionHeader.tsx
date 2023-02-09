import React from 'react';
import { useIntl } from 'react-intl';

import SectionHeader from './SectionHeader';
import messages from '../messages';

const HelpingMaterialsSectionHeader = () => {
  const { formatMessage } = useIntl();
  return (
    <SectionHeader title={formatMessage(messages.helpingMaterials)} pl={24} />
  );
};

export default HelpingMaterialsSectionHeader;
