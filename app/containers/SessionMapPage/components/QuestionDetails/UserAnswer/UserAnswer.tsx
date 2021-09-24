import React from 'react';
import { useIntl } from 'react-intl';

import { Question, QuestionBody } from 'global/types/question';

import { Answer } from 'models/Answer';
import { QuestionTypes } from 'models/Question/QuestionDto';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { questionTypesWithoutAnswers } from '../../../constants';
import messages from './messages';
import SingleAnswer from './SingleAnswer';
import MultiAnswer from './MultiAnswer';

type Props = {
  question: Question;
  answer: Nullable<Answer>;
};

const UserAnswer = ({ question, answer }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { type, body } = question;

  const renderUserAnswerByQuestionType = (): JSX.Element[] | JSX.Element => {
    if (questionTypesWithoutAnswers.includes(type)) {
      return (
        <Text color={themeColors.warning}>{formatMessage(messages[type])}</Text>
      );
    }

    if (!answer) return <></>;

    switch (type) {
      case QuestionTypes.SINGLE:
        const singleAnswerQuestionBody = body as QuestionBody<string>;
        return (
          <SingleAnswer
            questionBody={singleAnswerQuestionBody}
            answer={answer}
          />
        );
      case QuestionTypes.MULTIPLE:
        const multiAnswerQuestionBody = body as QuestionBody<string>;
        return (
          <MultiAnswer questionBody={multiAnswerQuestionBody} answer={answer} />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.yourAnswer)}
      </Comment>
      {renderUserAnswerByQuestionType()}
    </>
  );
};

export default UserAnswer;
