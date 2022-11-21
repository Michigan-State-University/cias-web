import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';

import { MS_IN_S } from 'global/constants';

import useRefreshComponent from 'utils/useRefreshComponent';

import Text from 'components/Text';
import Box from 'components/Box';
import AnimatedCircle from 'components/AnimatedCircle';

import messages from './messages';
import { InnerCircle, CountdownTimerContainer } from './styled';
import {
  TIMER_ANIMATED_CIRCLE_INNER_RADIUS,
  TIMER_ANIMATED_CIRCLE_OUTER_RADIUS,
} from './constants';

export type Props = {
  endTime: string;
  rangeMs: number;
};

const CountdownCircleTimer = ({ endTime, rangeMs }: Props) => {
  const { formatMessage } = useIntl();
  useRefreshComponent(MS_IN_S);

  const timeLeftMs = dayjs(endTime).diff();

  const [startTimeLeftMs, setStartTimeLeftMs] = useState<number>(timeLeftMs);

  useEffect(() => {
    setStartTimeLeftMs(timeLeftMs);
  }, [endTime]);

  const isEnd = timeLeftMs <= 0;

  return (
    <CountdownTimerContainer>
      <Box position="absolute" width="100%">
        <AnimatedCircle
          animationDurationMs={rangeMs}
          animationStartMs={startTimeLeftMs}
          outerRadius={TIMER_ANIMATED_CIRCLE_OUTER_RADIUS}
          innerRadius={TIMER_ANIMATED_CIRCLE_INNER_RADIUS}
        />
      </Box>
      <InnerCircle>
        <Text fontSize={32} lineHeight={1} fontWeight="bold">
          {dayjs(isEnd ? 0 : timeLeftMs).format('mm:ss')}
        </Text>
        <Box position="absolute" width="100%">
          <Text
            fontSize={10}
            lineHeight={1}
            opacity={0.7}
            position="absolute"
            top={24}
            width="100%"
            textAlign="center"
          >
            {formatMessage(messages.left)}
          </Text>
        </Box>
      </InnerCircle>
    </CountdownTimerContainer>
  );
};

export default CountdownCircleTimer;
