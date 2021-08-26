import React from 'react';
import { useIntl } from 'react-intl';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';
import { htmlToPlainText } from 'utils/htmlToPlainText';

import { colors } from 'theme';
import Comment from 'components/Text/Comment';
import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Column from 'components/Column';
import Row from 'components/Row';
import QuestionTypeIndicator from 'components/QuestionTypeIndicator';

import messages from './messages';
import VariablesAndScores from './VariablesAndScores';
import FormulaAndCases from './FormulaAndCases';

type Props = {
  questionGroup: QuestionGroup;
  question: Question;
};

const SessionMapQuestionDetails = ({
  questionGroup,
  question,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <>
      <H2 mb={15}>{formatMessage(messages.chosenSlide)}</H2>
      <Comment mb={20}>{formatMessage(messages.chosenSlideComment)}</Comment>
      <Box
        border={`1px solid ${colors.linkWater}`}
        background={colors.zirkon}
        height="100%"
        padding={20}
      >
        <Text color={colors.electricPurple} fontWeight="bold" mb={10}>
          {questionGroup.title}
        </Text>
        <Row gap={30}>
          <Column filled>
            <H2>{htmlToPlainText(question.subtitle)}</H2>
          </Column>
          <Column width="auto">
            <QuestionTypeIndicator
              type={question.type}
              iconSize="9px"
              fontSize={13}
              gap={8}
            />
          </Column>
        </Row>
        <VariablesAndScores question={question} />
        <FormulaAndCases question={question} />
      </Box>
    </>
  );
};

export default SessionMapQuestionDetails;
