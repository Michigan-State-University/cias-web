import React from 'react';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import Switch from 'components/Switch';
import Radio from 'components/Radio';
import Text from 'components/Text';
import H3 from 'components/H3';

import messages from '../messages';

// type Props = {};
const NoNavigatorsForm = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <Box display="flex">
        <H3>{formatMessage(messages.notifyNavigator)}</H3>
        <Switch checked onToggle={() => {}} />
      </Box>
      <Box display="flex" mt={20}>
        <Radio id="notify_by_sms_radio" onChange={() => {}} checked={false}>
          <Text mr={32}>{formatMessage(messages.notifyBySms)}</Text>
        </Radio>
        <Radio id="notify_by_email_radio" onChange={() => {}} checked>
          <Text>{formatMessage(messages.notifyByEmail)}</Text>
        </Radio>
      </Box>
    </>
  );
};

export default NoNavigatorsForm;
