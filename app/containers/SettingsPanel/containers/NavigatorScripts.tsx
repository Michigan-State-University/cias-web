import React from 'react';
import { FormattedMessage } from 'react-intl';

import Column from 'components/Column';
import H2 from 'components/H2';

import DownloadScriptTemplatePanel from '../Components/DownloadScriptTemplatePanel';
import messages from '../messages';

export const NavigatorScripts = () => (
  <Column gap={24}>
    <H2 fontSize={16} lineHeight="24px">
      <FormattedMessage {...messages.scriptsForNavigator} />
    </H2>
    <DownloadScriptTemplatePanel />
  </Column>
);

export default NavigatorScripts;
