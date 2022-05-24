import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import CrossIcon from 'assets/svg/cross-white-bold.svg';
import { useIsTouchScreen } from 'utils/useIsTouchScreen';
import { useTapAndHold } from 'utils/useTapAndHold';

import Text from 'components/Text';
import Icon from 'components/Icon';

import messages from './messages';
import { QuickExitButton, QuickExitButtonContainer } from './styled';
import {
  ESC_DOUBLE_CLICK_INTERVAL_MS,
  QUICK_EXIT_DESTINATION_URL,
  TAP_AND_HOLD_FINGERS,
  TAP_AND_HOLD_MOVE_THRESHOLD_PX,
  TAP_AND_HOLD_TIMEOUT_MS,
} from './constants';

export type Props = {
  isMediumAndUp: boolean;
  isMobilePreview: boolean;
  beforeQuickExit?: () => void;
};

const QuickExit = ({
  isMediumAndUp,
  isMobilePreview,
  beforeQuickExit,
}: Props) => {
  const { formatMessage } = useIntl();

  const onQuickExit = useCallback(() => {
    if (beforeQuickExit) beforeQuickExit();
    document.location.replace(QUICK_EXIT_DESTINATION_URL);
  }, [beforeQuickExit]);

  const [lastEscClickTimestamp, setLastEscClickTimestamp] = useState<number>();

  const handleEscClick = useCallback(
    ({ key, timeStamp }: KeyboardEvent) => {
      if (key !== 'Escape') {
        setLastEscClickTimestamp(undefined);
        return;
      }

      const isDoubleClick =
        lastEscClickTimestamp !== undefined &&
        timeStamp - lastEscClickTimestamp <= ESC_DOUBLE_CLICK_INTERVAL_MS;

      if (!isDoubleClick) {
        setLastEscClickTimestamp(timeStamp);
        return;
      }

      onQuickExit();
    },
    [lastEscClickTimestamp, onQuickExit],
  );

  useEffect(() => {
    document.addEventListener('keyup', handleEscClick);

    return () => {
      document.removeEventListener('keyup', handleEscClick);
    };
  }, [handleEscClick]);

  useTapAndHold(
    onQuickExit,
    TAP_AND_HOLD_FINGERS,
    TAP_AND_HOLD_TIMEOUT_MS,
    TAP_AND_HOLD_MOVE_THRESHOLD_PX,
    true,
  );

  const isTouchScreen = useIsTouchScreen();
  const showExitButton = !isMobilePreview && (isMediumAndUp || !isTouchScreen);

  return (
    <>
      {showExitButton && (
        <QuickExitButtonContainer
          title={formatMessage(messages.exitButtonTitle)}
          onClick={onQuickExit}
        >
          <QuickExitButton>
            {/* @ts-ignore */}
            <Icon src={CrossIcon} alt={formatMessage(messages.exitIconAlt)} />
          </QuickExitButton>
          <Text color={themeColors.warning} fontWeight="bold">
            {formatMessage(messages.exit)}
          </Text>
        </QuickExitButtonContainer>
      )}
    </>
  );
};

export default QuickExit;
