import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { QuestionGroup } from 'global/types/questionGroup';
import { FeedbackQuestionPayload, Question } from 'global/types/question';
import { ReportTemplate } from 'global/types/reportTemplate';

import { QuestionTypes } from 'models/Question/QuestionDto';
import { SessionDto } from 'models/Session/SessionDto';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { colors } from 'theme';

import Comment from 'components/Text/Comment';
import H2 from 'components/H2';
import Box from 'components/Box';
import Text from 'components/Text';
import Column from 'components/Column';
import Row from 'components/Row';
import QuestionTypeIndicator from 'components/QuestionTypeIndicator';
import Button from 'components/Button';

import messages from './messages';
import VariablesAndScores from './VariablesAndScores';
import {
  FeedbackFormulaAndCases,
  BranchingFormulaAndCases,
} from './FormulaAndCases';

const typesWithoutVariablesAndScoresSection = [
  QuestionTypes.INFORMATION,
  QuestionTypes.FINISH,
  QuestionTypes.FEEDBACK,
];

type Props = {
  questionGroup: QuestionGroup;
  question: Question;
  reportTemplates: ReportTemplate[];
  sessions: SessionDto[];
  questions: Question[];
  onGoToScreenClick: () => void;
};

const SessionMapQuestionDetails = ({
  questionGroup,
  question,
  reportTemplates,
  sessions,
  questions,
  onGoToScreenClick,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { subtitle, type } = question;

  return (
    <>
      <H2 mb={15}>{formatMessage(messages.chosenSlide)}</H2>
      <Comment mb={20}>{formatMessage(messages.chosenSlideComment)}</Comment>
      <Box
        border={`1px solid ${colors.linkWater}`}
        background={colors.zirkon}
        height="100%"
        padding={20}
        overflow="auto"
        display="flex"
        direction="column"
        justify="between"
      >
        <div>
          <Text color={colors.electricPurple} fontWeight="bold" mb={10}>
            {questionGroup.title}
          </Text>
          <Row gap={30}>
            <Column filled>
              <H2>{htmlToPlainText(subtitle)}</H2>
            </Column>
            <Column width="auto">
              <QuestionTypeIndicator
                type={type}
                iconSize="9px"
                fontSize={13}
                fontWeight="bold"
                gap={8}
              />
            </Column>
          </Row>
          {!typesWithoutVariablesAndScoresSection.includes(type) && (
            <VariablesAndScores
              question={question}
              reportTemplates={reportTemplates}
            />
          )}
          {type === QuestionTypes.FEEDBACK && (
            <FeedbackFormulaAndCases
              question={question as Question<FeedbackQuestionPayload>}
            />
          )}
          {type !== QuestionTypes.FINISH && (
            <BranchingFormulaAndCases
              question={question}
              sessions={sessions}
              questions={questions}
            />
          )}
        </div>
        <div>
          <Button
            // @ts-ignore
            onClick={onGoToScreenClick}
            width={175}
            title={formatMessage(messages.jumpToScreen)}
            mt={30}
          />
        </div>
      </Box>
    </>
  );
};

export default memo(SessionMapQuestionDetails);
