import React from 'react';
import { useIntl } from 'react-intl';

import { Question, QuestionBody } from 'global/types/question';

import { Answer, NameAnswerValue } from 'models/Answer';
import { QuestionTypes } from 'models/Question/QuestionDto';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { questionTypesWithoutAnswers } from '../../../constants';
import messages from './messages';
import SingleAnswer from './SingleAnswer';
import MultiAnswer from './MultiAnswer';
import FreeResponseAnswer from './FreeResponseAnswer';
import DateAnswer from './DateAnswer';
import NameAnswer from './NameAnswer';

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
        const singleAnswer = answer as Answer<string>;
        return (
          <SingleAnswer
            questionBody={singleAnswerQuestionBody}
            answer={singleAnswer}
          />
        );
      case QuestionTypes.MULTIPLE:
        const multiAnswerQuestionBody = body as QuestionBody<string>;
        const multiAnswer = answer as Answer<string>;
        return (
          <MultiAnswer
            questionBody={multiAnswerQuestionBody}
            answer={multiAnswer}
          />
        );
      case QuestionTypes.FREE_RESPONSE:
        const freeResponseAnswer = answer as Answer<string>;
        return <FreeResponseAnswer answer={freeResponseAnswer} />;
      case QuestionTypes.DATE:
        const dateAnswer = answer as Answer<string>;
        return <DateAnswer answer={dateAnswer} />;
      case QuestionTypes.NAME:
        const nameAnswer = answer as Answer<NameAnswerValue>;
        return <NameAnswer answer={nameAnswer} />;
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
