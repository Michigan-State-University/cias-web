import React, { useCallback } from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { ThirdPartyReportQuestionDTO } from 'models/Question';
import { ThirdPartyReportAnswer } from 'models/Answer';

import { colors } from 'theme';

import Row from 'components/Row';
import { Radio } from 'components/Radio';
import Text from 'components/Text';

type Props = {
  question: ThirdPartyReportQuestionDTO;
  answer: ThirdPartyReportAnswer;
};

// IMPLEMENTATION LIMITATION:
// all options with a value equal to the answer's value will be checked
// despite the fact that only one option can be selected
const ThirdPartyReportUserAnswer = ({
  question: {
    body: { data: questionData },
  },
  answer: {
    decryptedBody: { data: answerData },
    id,
  },
}: Props): JSX.Element => {
  const getRadioId = useCallback(
    (index: number) =>
      `session-map-question-details-answer-${id}-radio-${index}`,
    [id],
  );

  return (
    <Row gap={15} flexWrap="wrap">
      {questionData.map(({ value, payload }, index) => (
        <Radio
          checked={value === answerData[0].value}
          disabled
          id={getRadioId(index)}
          key={getRadioId(index)}
        >
          <Text color={colors.jungleGreen} fontWeight="bold">
            {htmlToPlainText(payload)}
          </Text>
        </Radio>
      ))}
    </Row>
  );
};

export default ThirdPartyReportUserAnswer;
