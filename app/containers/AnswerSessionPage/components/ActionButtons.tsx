import React, { memo } from 'react';
import { useIntl } from 'react-intl';

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
};

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

  return (
    <Row width="100%" my={20} justify="end" align="center">
      {renderSkipQuestionButton && (
        <SkipQuestionButton
          onClick={onSkipQuestionClick}
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
          onClick={onContinueClick}
          title={formatMessage(messages.nextQuestion)}
        />
      )}
    </Row>
  );
};

export const ActionButtons = memo(Component);
