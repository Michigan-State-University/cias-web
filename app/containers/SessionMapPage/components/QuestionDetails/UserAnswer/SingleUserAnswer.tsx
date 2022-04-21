import React, { useCallback } from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { SingleQuestionDTO } from 'models/Question';
import { SingleAnswer } from 'models/Answer';

import { colors } from 'theme';

import Row from 'components/Row';
import { Radio } from 'components/Radio';
import Text from 'components/Text';

type Props = {
  question: SingleQuestionDTO;
  answer: SingleAnswer;
};

// IMPLEMENTATION LIMITATION:
// all options with a value equal to the answer's value will be checked
// despite the fact that this is a single answer question
const SingleUserAnswer = ({
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

export default SingleUserAnswer;
