import React from 'react';
import { useIntl } from 'react-intl';

import { GridQuestionPayload, Question } from 'global/types/question';
import { QuestionTypes } from 'models/Question/QuestionDto';

import Comment from 'components/Text/Comment';

import VariableAndScoreChip from './VariableAndScoreChip';
import { ChipsContainer } from './styled';
import messages from './messages';

const typesWithoutVariablesAndScoresSection = [
  QuestionTypes.INFORMATION,
  QuestionTypes.FINISH,
];

type Props = {
  question: Question;
};

const VariablesAndScores = ({
  question: { body, type },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const renderChipsByQuestionType = (): JSX.Element[] | JSX.Element => {
    switch (type) {
      case QuestionTypes.SINGLE:
      case QuestionTypes.FREE_RESPONSE:
      case QuestionTypes.DATE:
      case QuestionTypes.CURRENCY:
      case QuestionTypes.NUMBER:
      case QuestionTypes.EXTERNAL_LINK:
      case QuestionTypes.PARTICIPANT_REPORT:
      case QuestionTypes.PHONE:
        return body.data.map(({ value }, index) => (
          <VariableAndScoreChip
            name={body.variable?.name}
            score={value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.SLIDER:
        return body.data.map((_, index) => (
          <VariableAndScoreChip
            name={body.variable?.name}
            score="0 - 100"
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.MULTIPLE:
        return body.data.map(({ variable }, index) => (
          <VariableAndScoreChip
            name={variable?.name}
            score={variable?.value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.GRID:
        const { rows, columns } = body.data[0].payload as GridQuestionPayload;
        return rows.flatMap(({ variable: { name } }, rowIndex) =>
          columns.map(({ variable: { value } }, columnIndex) => (
            <VariableAndScoreChip
              name={name}
              score={value}
              key={`session-map-question-details-variable-${rowIndex}-${columnIndex}`}
            />
          )),
        );
      default:
        return <></>;
    }
  };

  if (typesWithoutVariablesAndScoresSection.includes(type)) return <></>;

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.variablesAndScores)}
      </Comment>
      <ChipsContainer>{renderChipsByQuestionType()}</ChipsContainer>
    </>
  );
};

export default VariablesAndScores;
