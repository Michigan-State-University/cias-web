import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import CrossIcon from 'assets/svg/cross-white-bold.svg';
import GestureIcon1 from 'assets/svg/two-fingers-tap-gesture-1.svg';
import GestureIcon2 from 'assets/svg/two-fingers-tap-gesture-2.svg';
import { useIsTouchScreen } from 'utils/useIsTouchScreen';
import { useTapAndHold } from 'utils/useTapAndHold';

import { themeColors, colors } from 'theme';
import Text from 'components/Text';
import Icon from 'components/Icon';
import H2 from 'components/H2';
import { Button } from 'components/Button';
import Modal, { PopoverModal } from 'components/Modal';
import H1 from 'components/H1';
import Column from 'components/Column';
import Row from 'components/Row';
import Divider from 'components/Divider';
import { ANSWER_SESSION_PAGE_ID } from 'containers/App/constants';

import messages from './messages';
import {
  QuickExitButton,
  QuickExitButtonContainer,
  QuickExitPositionWrapper,
} from './styled';
import {
  ESC_DOUBLE_CLICK_INTERVAL_MS,
  QUICK_EXIT_BUTTON_ID,
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

  const [buttonOnbroading, setButtonOnbroading] = useState('');
  const [buttonOnbroadingCompleted, setButtonOnbroadingCompleted] =
    useState(false);

  const openButtonOnboarding = () => {
    if (!buttonOnbroadingCompleted) setButtonOnbroading(QUICK_EXIT_BUTTON_ID);
  };

  const closeButtonOnboarding = () => {
    setButtonOnbroading('');
    setButtonOnbroadingCompleted(true);
  };

  const [gestureOnboarding, setGestureOnboarding] = useState(false);
  const [gestureOnboardingCompleted, setGestureOnboardingCompleted] =
    useState(false);

  const openGestureOnboarding = () => {
    if (!gestureOnboardingCompleted) setGestureOnboarding(true);
  };

  const closeGestureOnboarding = () => {
    setGestureOnboarding(false);
    setGestureOnboardingCompleted(true);
    if (showExitButton) {
      openButtonOnboarding();
    }
  };

  useEffect(() => {
    if (isMobilePreview || isTouchScreen) {
      openGestureOnboarding();
    } else {
      openButtonOnboarding();
    }
  }, [isMobilePreview]);

  return (
    <>
      {showExitButton && (
        <>
          <QuickExitPositionWrapper>
            <QuickExitButtonContainer
              title={formatMessage(messages.exitButtonTitle)}
              onClick={onQuickExit}
              id={QUICK_EXIT_BUTTON_ID}
            >
              <QuickExitButton>
                {/* @ts-ignore */}
                <Icon
                  src={CrossIcon}
                  alt={formatMessage(messages.exitIconAlt)}
                />
              </QuickExitButton>
              <Text color={themeColors.warning} fontWeight="bold">
                {formatMessage(messages.exit)}
              </Text>
            </QuickExitButtonContainer>
          </QuickExitPositionWrapper>
          <PopoverModal
            portalId={ANSWER_SESSION_PAGE_ID}
            referenceElement={buttonOnbroading}
            onClose={closeButtonOnboarding}
            disableClose
            width="360px"
            modalStyle={{
              backgroundColor: colors.white,
              borderColor: 'transparent',
              padding: '8px',
            }}
            forceDim
            excludeRefDim={{
              paddingLeft: '16px',
              marginLeft: '-16px',
            }}
          >
            <H2>{formatMessage(messages.onboardingTitle)}</H2>
            <Markup
              content={formatMessage(messages.buttonOnboardingText)}
              attributes={{ lineHeight: '23px', mt: 8 }}
              tagName={Text}
            />
            <Button
              // @ts-ignore
              title={formatMessage(messages.onboardingCloseButtonText)}
              onClick={closeButtonOnboarding}
              width="auto"
              px={32}
              mt={24}
            />
          </PopoverModal>
        </>
      )}
      <Modal
        visible={gestureOnboarding}
        minWidth={366}
        maxWidth={366}
        py={32}
        px={24}
      >
        <Column align="center">
          <Row align="center" gap={24}>
            {/* @ts-ignore */}
            <Icon
              src={GestureIcon1}
              alt={formatMessage(messages.gestureOnboardingIcon1Alt)}
            />
            <Text fontSize={16} fontWeight="medium">
              {formatMessage(messages.or)}
            </Text>
            {/* @ts-ignore */}
            <Icon
              src={GestureIcon2}
              alt={formatMessage(messages.gestureOnboardingIcon2Alt)}
            />
          </Row>
          <Divider mt={32} />
          <H1 mt={32}>{formatMessage(messages.onboardingTitle)}</H1>
          <Markup
            content={formatMessage(messages.gestureOnboardingText)}
            attributes={{ lineHeight: '23px', mt: 16, textAlign: 'center' }}
            tagName={Text}
          />
          <Button
            // @ts-ignore
            title={formatMessage(messages.onboardingCloseButtonText)}
            onClick={closeGestureOnboarding}
            width="auto"
            px={32}
            mt={56}
          />
        </Column>
      </Modal>
    </>
  );
};

export default QuickExit;
