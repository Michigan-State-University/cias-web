import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { elements } from 'theme';

import Row from 'components/Row';
import { Button } from 'components/Button';

import messages from '../messages';
import { SkipQuestionButton } from './SkipQuestionButton';

type SkipButtonProps =
  | {
      renderSkipQuestionButton: true;
      onSkipQuestionClick: () => void;
      skipQuestionButtonDisabled?: boolean;
      skipButtonStyle?: Record<string, unknown>;
    }
  | {
      renderSkipQuestionButton?: false;
      onSkipQuestionClick?: undefined;
      skipQuestionButtonDisabled?: undefined;
      skipButtonStyle?: undefined;
    };

type ContinueButtonProps =
  | {
      renderContinueButton: true;
      onContinueClick: () => void;
      continueButtonDisabled?: boolean;
      continueButtonLoading?: boolean;
      continueButtonStyle?: Record<string, unknown>;
    }
  | {
      renderContinueButton?: false;
      onContinueClick?: undefined;
      continueButtonDisabled?: undefined;
      continueButtonLoading?: undefined;
      continueButtonStyle?: undefined;
    };

type CommonProps = {
  containerStyle?: Record<string, unknown>;
};

export type ActionButtonsProps = SkipButtonProps &
  ContinueButtonProps &
  CommonProps;

const Component = ({
  renderSkipQuestionButton,
  skipQuestionButtonDisabled,
  onSkipQuestionClick,
  renderContinueButton,
  continueButtonDisabled,
  continueButtonLoading,
  onContinueClick,
  containerStyle,
  skipButtonStyle,
  continueButtonStyle,
}: ActionButtonsProps) => {
  const { formatMessage } = useIntl();

  const handleSkipButtonClick = () =>
    onSkipQuestionClick && onSkipQuestionClick();

  const handleContinueButtonClick = () => onContinueClick && onContinueClick();

  return (
    <Row
      width="100%"
      my={20}
      justify="end"
      align="center"
      // TODO detect dir
      {...containerStyle}
    >
      {renderSkipQuestionButton && (
        <SkipQuestionButton
          onClick={handleSkipButtonClick}
          disabled={skipQuestionButtonDisabled}
          // TODO detect dir
          {...skipButtonStyle}
        />
      )}

      {renderContinueButton && (
        <Button
          data-cy="continue-button"
          disabled={continueButtonDisabled}
          margin={20}
          width={elements.continueButtonWidth}
          loading={continueButtonLoading}
          onClick={handleContinueButtonClick}
          title={formatMessage(messages.nextQuestion)}
          {...continueButtonStyle}
        />
      )}
    </Row>
  );
};

export const ActionButtons = memo(Component);
