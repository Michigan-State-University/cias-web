import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { ReportTemplate } from 'models/ReportTemplate/ReportTemplateModel';
import { QuestionGroup } from 'models/QuestionGroup';
import {
  QuestionTypes,
  FeedbackQuestionDTO,
  QuestionDTO,
} from 'models/Question';
import { SessionDto } from 'models/Session/SessionDto';
import { Answer } from 'models/Answer';

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

import { questionTypesWithoutVariables } from '../../constants';
import messages from './messages';
import VariablesAndScores from './VariablesAndScores';
import {
  BranchingFormulaAndCases,
  FeedbackFormulaAndCases,
} from './FormulaAndCases';
import UserAnswer from './UserAnswer';

type Props = {
  shownQuestion: QuestionDTO;
  isUserSessionQuestion: boolean; // was this question shown to the user during preview session?
  questionAnswer: Nullable<Answer>;
  questionGroup: QuestionGroup;
  reportTemplates: ReportTemplate[];
  sessions: SessionDto[];
  questions: QuestionDTO[];
  onGoToScreenClick: () => void;
};

const SessionMapQuestionDetails = ({
  shownQuestion,
  isUserSessionQuestion,
  questionAnswer,
  questionGroup,
  reportTemplates,
  sessions,
  questions,
  onGoToScreenClick,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { subtitle, type } = shownQuestion;

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
          {!questionTypesWithoutVariables.includes(type) && (
            <VariablesAndScores
              question={shownQuestion}
              reportTemplates={reportTemplates}
            />
          )}
          {type === QuestionTypes.FEEDBACK && (
            <FeedbackFormulaAndCases
              question={shownQuestion as FeedbackQuestionDTO}
            />
          )}
          {type !== QuestionTypes.FINISH && (
            <BranchingFormulaAndCases
              question={shownQuestion}
              sessions={sessions}
              questions={questions}
            />
          )}
          {isUserSessionQuestion && (
            <UserAnswer question={shownQuestion} answer={questionAnswer} />
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
