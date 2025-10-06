import { useCallback } from 'react';
import { throttle } from 'lodash';
import axios from 'axios';

import { PING_THROTTLE_INTERVAL } from 'global/constants/time';

export const useSessionPing = () => {
  const sendPing = useCallback(
    throttle(
      () => {
        axios.get('/v1/auth/ping').catch(() => {});
      },
      PING_THROTTLE_INTERVAL,
      { leading: true, trailing: false },
    ),
    [],
  );

  return { sendPing };
};
