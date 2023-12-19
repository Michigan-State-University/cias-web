import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { elements } from 'theme';

import { QuestionTypes } from 'models/Question';

import Row from 'components/Row';
import { Button } from 'components/Button';

import messages from '../messages';
import { SkipQuestionButton } from './SkipQuestionButton';

import { NOT_SKIPPABLE_QUESTIONS } from '../constants';

type SkipButtonProps = {
  questionType: QuestionTypes;
  questionRequired: boolean;
  isCatMhSession: boolean;
  onSkipQuestionClick?: () => void;
  skipQuestionButtonDisabled?: boolean;
  skipButtonStyle?: Record<string, unknown>;
};

type ContinueButtonProps = {
  renderContinueButton: boolean;
  continueButtonDisabled?: boolean;
  onContinueClick?: () => void;
  continueButtonLoading?: boolean;
  continueButtonStyle?: Record<string, unknown>;
};

type CommonProps = {
  containerStyle?: Record<string, unknown>;
};

export type ActionButtonsProps = SkipButtonProps &
  ContinueButtonProps &
  CommonProps;

const Component = ({
  questionType,
  questionRequired,
  isCatMhSession,
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

  const renderSkipQuestionButton =
    !questionRequired &&
    !isCatMhSession &&
    !NOT_SKIPPABLE_QUESTIONS.includes(questionType);

  const handleSkipButtonClick = () =>
    onSkipQuestionClick && onSkipQuestionClick();

  const handleContinueButtonClick = () => onContinueClick && onContinueClick();

  return (
    <Row width="100%" my={20} justify="end" align="center" {...containerStyle}>
      {renderSkipQuestionButton && (
        <SkipQuestionButton
          onClick={handleSkipButtonClick}
          disabled={skipQuestionButtonDisabled}
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
