import React from 'react';
import { useIntl } from 'react-intl';

import { colors, boxShadows } from 'theme';

import { PopoverModal } from 'components/Modal';
import { Text } from 'components/Text';
import H3 from 'components/H3';

import { LIVE_CHAT_ICON_ID } from '../constants';
import messages from '../messages';

const NavigatorArrivedPopover = () => {
  const { formatMessage } = useIntl();

  return (
    <PopoverModal
      referenceElement={LIVE_CHAT_ICON_ID}
      defaultPlacement="top"
      disableClose
      width="200px"
      contentPadding="16px"
      offsetOptions={16}
      modalStyle={{
        backgroundColor: colors.white,
        borderColor: 'transparent',
        borderRadius: '6px',
        boxShadow: boxShadows.selago,
      }}
    >
      <H3 lineHeight={1} mb={10}>
        {formatMessage(messages.hello)}
      </H3>
      <Text lineHeight="22px">{formatMessage(messages.navigatorArrived)}</Text>
    </PopoverModal>
  );
};

export default NavigatorArrivedPopover;
