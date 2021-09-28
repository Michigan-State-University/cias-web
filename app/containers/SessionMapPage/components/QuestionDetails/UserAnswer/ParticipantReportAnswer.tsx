import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { Answer, ParticipantReportAnswerValue } from 'models/Answer';

import { colors } from 'theme';

import Row from 'components/Row';
import { Radio } from 'components/Radio';
import Text from 'components/Text';

import messages from './messages';

type Props = {
  answer: Answer<ParticipantReportAnswerValue>;
};

const ParticipantReportAnswer = ({
  answer: {
    decryptedBody: { data: answerData },
    id,
  },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const getRadioId = useCallback(
    (label: string) =>
      `session-map-question-details-answer-${id}-radio-${label}`,
    [id],
  );

  const { receiveReport } = answerData[0].value;

  return (
    <Row gap={15} flexWrap="wrap">
      <Radio checked={receiveReport} disabled id={getRadioId('yes')}>
        <Text color={colors.jungleGreen} fontWeight="bold">
          {formatMessage(messages.yes)}
        </Text>
      </Radio>
      <Radio checked={!receiveReport} disabled id={getRadioId('no')}>
        <Text color={colors.jungleGreen} fontWeight="bold">
          {formatMessage(messages.no)}
        </Text>
      </Radio>
    </Row>
  );
};

export default ParticipantReportAnswer;
