import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import Text from 'components/Text';

import messages from '../../messages';

type Props = {
  sessionIndex: number;
};

const SessionMapSessionNodeDetailedInfo = ({
  sessionIndex,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Text mb={12} fontSize={12} fontWeight="bold">
        {formatMessage(messages.redirectionTo, { no: sessionIndex })}
      </Text>
      <Markup content={formatMessage(messages.switchSession)} noWrap />
    </div>
  );
};

export default memo(SessionMapSessionNodeDetailedInfo);
