import React, { useCallback } from 'react';

import { GridQuestionPayload, QuestionBody } from 'global/types/question';

import { Answer } from 'models/Answer';

import { colors } from 'theme';

import Row from 'components/Row';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';

type Props = {
  questionBody: QuestionBody<GridQuestionPayload>;
  answer: Answer<string>;
};

// IMPLEMENTATION LIMITATION:
// any option in a row without a variable name will not be shown even if this option was selected by the user
// all options in a row with a value equal to the answer's value will be shown
const GridAnswer = ({
  questionBody: { data: questionData },
  answer: {
    decryptedBody: { data: answerData },
    id,
  },
}: Props): JSX.Element => {
  const { rows, columns } = questionData[0].payload;

  const getRowId = useCallback(
    (index: number) => `session-map-question-details-answer-${id}-row-${index}`,
    [id],
  );

  const getAnswerLabel = useCallback(
    (variableName: string): string => {
      if (!variableName) return '';
      const answerValue = answerData.find(
        (answer) => answer.var === variableName,
      )?.value;
      if (!answerValue) return '';
      return columns
        .filter(({ variable }) => variable.value === answerValue)
        .map(({ payload }) => payload)
        .join(', ');
    },
    [columns],
  );

  return (
    <>
      {rows.map(({ payload, variable }, index) => (
        <Row key={getRowId(index)}>
          <Comment mr={4}>{`${payload}: `}</Comment>
          <Text color={colors.jungleGreen} fontWeight="bold">
            {getAnswerLabel(variable.name)}
          </Text>
        </Row>
      ))}
    </>
  );
};

export default GridAnswer;
