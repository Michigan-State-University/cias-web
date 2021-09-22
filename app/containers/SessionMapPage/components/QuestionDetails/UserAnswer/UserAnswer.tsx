import React from 'react';
import { useIntl } from 'react-intl';

import { Question } from 'global/types/question';
import { Answer } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { questionTypesWithoutAnswers } from '../../../constants';
import messages from './messages';

type Props = {
  question: Question;
  answer: Nullable<Answer>;
};

const UserAnswer = ({ question, answer }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { type } = question;

  const renderUserAnswerByQuestionType = (): JSX.Element[] | JSX.Element => {
    if (questionTypesWithoutAnswers.includes(type)) {
      return (
        <Text color={themeColors.warning}>{formatMessage(messages[type])}</Text>
      );
    }

    return <>{JSON.stringify(answer)}</>;
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
