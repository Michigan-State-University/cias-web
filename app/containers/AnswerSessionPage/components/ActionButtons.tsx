import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { elements } from 'theme';

import Row from 'components/Row';
import { Button } from 'components/Button';

import messages from '../messages';
import { SkipQuestionButton } from './SkipQuestionButton';

export type ActionButtonsProps = {
  renderSkipQuestionButton: boolean;
  skipQuestionButtonDisabled: boolean;
  onSkipQuestionClick: () => void;
  renderContinueButton: boolean;
  continueButtonDisabled: boolean;
  continueButtonLoading: boolean;
  onContinueClick: () => void;
  containerStyle?: Record<string, unknown>;
  skipButtonStyle?: Record<string, unknown>;
  continueButtonStyle?: Record<string, unknown>;
};

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

  return (
    <Row width="100%" my={20} justify="end" align="center" {...containerStyle}>
      {renderSkipQuestionButton && (
        <SkipQuestionButton
          onClick={onSkipQuestionClick}
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
          onClick={onContinueClick}
          title={formatMessage(messages.nextQuestion)}
          {...continueButtonStyle}
        />
      )}
    </Row>
  );
};

export const ActionButtons = memo(Component);
