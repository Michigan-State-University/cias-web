import React, { useCallback } from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { MultipleQuestionDTO } from 'models/Question';
import { MultiAnswer } from 'models/Answer';

import { colors } from 'theme';

import Row from 'components/Row';
import Checkbox from 'components/Checkbox';
import Text from 'components/Text';

type Props = {
  question: MultipleQuestionDTO;
  answer: MultiAnswer;
};

// IMPLEMENTATION LIMITATION:
// any option without a variable name assigned will not be checked
// even if this option was selected by the user
const MultiUserAnswer = ({
  question: {
    body: { data: questionData },
  },
  answer: {
    decryptedBody: { data: answerData },
    id,
  },
}: Props): JSX.Element => {
  const getCheckboxId = useCallback(
    (index: number) =>
      `session-map-question-details-answer-${id}-checkbox-${index}`,
    [id],
  );

  const hasNameAndIsSelected = useCallback(
    (optionVariableName: string) =>
      Boolean(optionVariableName) &&
      answerData.some(
        ({ var: answerVariableName }) =>
          answerVariableName === optionVariableName,
      ),
    [answerData],
  );

  return (
    <Row gap={15} flexWrap="wrap">
      {questionData.map(({ variable, payload }, index) => (
        <Checkbox
          checked={hasNameAndIsSelected(variable.name)}
          disabled
          id={getCheckboxId(index)}
          key={getCheckboxId(index)}
          onChange={() => {}}
        >
          <Text color={colors.jungleGreen} fontWeight="bold">
            {htmlToPlainText(payload)}
          </Text>
        </Checkbox>
      ))}
    </Row>
  );
};

export default MultiUserAnswer;
