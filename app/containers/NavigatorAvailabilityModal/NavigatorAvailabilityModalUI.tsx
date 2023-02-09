import React, { useContext, useState } from 'react';
import { useIntl } from 'react-intl';
import isNil from 'lodash/isNil';

import { colors } from 'theme';

import { NotificationsActionsContext } from 'utils/useNotificationChannel';

import Text from 'components/Text';
import Divider from 'components/Divider';
import Column from 'components/Column';
import Button from 'components/Button';
import { BoxRadio } from 'components/Radio';
import { ModalProps } from 'components/Modal';

import messages from './messages';

const NavigatorAvailabilityModalUI: ModalProps['modalContentRenderer'] = ({
  // eslint-disable-next-line react/prop-types
  closeModal,
}) => {
  const { formatMessage } = useIntl();

  const [online, setOnline] = useState<Nullable<boolean>>(null);

  const { setNavigatorAvailability } =
    useContext(NotificationsActionsContext) ?? {};

  const handleSave = () => {
    if (setNavigatorAvailability && !isNil(online)) {
      setNavigatorAvailability({ online });
    }
    closeModal();
  };

  return (
    <>
      <Text lineHeight="20px">
        {formatMessage(messages.navigatorAvailabilityDialogSubtitle)}
      </Text>
      <Divider mt={16} mb={40} color={colors.lightDivider} />
      <Column gap={20}>
        <BoxRadio
          checked={online === false}
          onChange={() => setOnline(false)}
          id="navigators-availability-option-no"
          title={formatMessage(messages.noOptionTitle)}
          description={formatMessage(messages.noOptionDescription)}
        />
        <BoxRadio
          checked={online === true}
          onChange={() => setOnline(true)}
          id="navigators-availability-option-yes"
          title={formatMessage(messages.yesOptionTitle)}
          description={formatMessage(messages.yesOptionDescription)}
        />
      </Column>
      <Button
        disabled={isNil(online)}
        onClick={handleSave}
        px={30}
        width="auto"
        mt={56}
      >
        {formatMessage(messages.startUsingApp)}
      </Button>
    </>
  );
};

export default NavigatorAvailabilityModalUI;
