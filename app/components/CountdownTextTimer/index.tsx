import React, { memo } from 'react';
import dayjs from 'dayjs';

import { MS_IN_S, S_IN_M } from 'global/constants';

import { themeColors } from 'theme';

import useRefreshComponent from 'utils/useRefreshComponent';

import Text from 'components/Text';

export type Props = {
  endTime: string;
};

const CountdownTextTimer = ({ endTime }: Props) => {
  useRefreshComponent(MS_IN_S);

  const timeLeftMs = dayjs(endTime).diff();

  const MINUTE = MS_IN_S * S_IN_M;

  return (
    <Text color={themeColors.primary} fontSize={15} fontWeight="bold">
      {dayjs(timeLeftMs).format(timeLeftMs < MINUTE ? 's[s]' : 'm[m] s[s]')}
    </Text>
  );
};

export default memo(CountdownTextTimer);
