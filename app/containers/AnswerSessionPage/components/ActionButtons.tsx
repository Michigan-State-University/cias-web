import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import Row from 'components/Row';
import { Button } from 'components/Button';

import messages from '../messages';
import { SkipQuestionButton } from './SkipQuestionButton';

type SkipButtonProps =
  | {
      renderSkipQuestionButton: true;
      onSkipQuestionClick: () => void;
      skipQuestionButtonDisabled?: boolean;
    }
  | {
      renderSkipQuestionButton?: false;
      onSkipQuestionClick?: undefined;
      skipQuestionButtonDisabled?: undefined;
    };

type ContinueButtonProps =
  | {
      renderContinueButton: true;
      onContinueClick: () => void;
      continueButtonDisabled?: boolean;
      continueButtonLoading?: boolean;
    }
  | {
      renderContinueButton?: false;
      onContinueClick?: undefined;
      continueButtonDisabled?: undefined;
      continueButtonLoading?: undefined;
    };

export type ActionButtonsProps = SkipButtonProps & ContinueButtonProps;

const Component = ({
  renderSkipQuestionButton,
  skipQuestionButtonDisabled,
  onSkipQuestionClick,
  renderContinueButton,
  continueButtonDisabled,
  continueButtonLoading,
  onContinueClick,
}: ActionButtonsProps) => {
  const { formatMessage } = useIntl();

  const handleSkipButtonClick = () =>
    onSkipQuestionClick && onSkipQuestionClick();

  const handleContinueButtonClick = () => onContinueClick && onContinueClick();

  return (
    <Row width="100%" my={20} justify="end" align="center">
      {renderSkipQuestionButton && (
        <SkipQuestionButton
          onClick={handleSkipButtonClick}
          disabled={skipQuestionButtonDisabled}
        />
      )}

      {renderContinueButton && (
        <Button
          data-cy="continue-button"
          disabled={continueButtonDisabled}
          margin={20}
          width="180px"
          loading={continueButtonLoading}
          onClick={handleContinueButtonClick}
          title={formatMessage(messages.nextQuestion)}
        />
      )}
    </Row>
  );
};

export const ActionButtons = memo(Component);
