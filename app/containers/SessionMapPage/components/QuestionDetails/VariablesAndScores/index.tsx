import React from 'react';
import { useIntl } from 'react-intl';

import { QuestionDTO, QuestionTypes } from 'models/Question';

import Comment from 'components/Text/Comment';
import Column from 'components/Column';

import messages from './messages';
import { ChipsContainer } from '../styled';
import VariableAndScoreChip from './VariableAndScoreChip';

type Props = {
  question: QuestionDTO;
};

const VariablesAndScores = ({ question }: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const renderChipsByQuestionType = (): JSX.Element[] | JSX.Element => {
    switch (question.type) {
      case QuestionTypes.FREE_RESPONSE:
      case QuestionTypes.DATE:
      case QuestionTypes.NAME:
      case QuestionTypes.CURRENCY:
      case QuestionTypes.NUMBER:
      case QuestionTypes.EXTERNAL_LINK:
      case QuestionTypes.PARTICIPANT_REPORT:
      case QuestionTypes.PHONE:
        return (
          <VariableAndScoreChip
            variable={question.body.variable.name}
            variableOnly
          />
        );
      case QuestionTypes.SINGLE:
      case QuestionTypes.THIRD_PARTY:
        return question.body.data.map(({ value }, index) => (
          <VariableAndScoreChip
            variable={question.body.variable.name}
            score={value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.HENRY_FORD_QUESTION:
        return question.body.data.map(({ value, hfh_value }, index) => (
          <VariableAndScoreChip
            variable={question.body.variable.name}
            score={value}
            key={`session-map-question-details-variable-${index}`}
            hsValue={hfh_value || '-'}
          />
        ));
      case QuestionTypes.SLIDER:
        return question.body.data.map((_, index) => (
          <VariableAndScoreChip
            variable={question.body.variable.name}
            score="0 - 100"
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.MULTIPLE:
        return question.body.data.map(({ variable }, index) => (
          <VariableAndScoreChip
            variable={variable.name}
            score={variable.value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.GRID:
        const { rows, columns } = question.body.data[0].payload;
        return (
          <Column gap={15}>
            {rows.map(({ variable: { name } }, rowIndex) => (
              <ChipsContainer key={`session-map-variables-row-${rowIndex}`}>
                {columns.map(({ variable: { value } }, columnIndex) => (
                  <VariableAndScoreChip
                    variable={name}
                    score={value}
                    key={`session-map-variable-${rowIndex}-${columnIndex}`}
                  />
                ))}
              </ChipsContainer>
            ))}
          </Column>
        );
      default:
        return <></>;
    }
  };

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
