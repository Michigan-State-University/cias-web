import React from 'react';
import { useIntl } from 'react-intl';

import {
  GridQuestionPayload,
  Question,
  QuestionBody,
  SliderQuestionPayload,
} from 'global/types/question';

import { Answer, AnswerType } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { questionTypesWithoutAnswers } from '../../../constants';
import messages from './messages';
import SingleUserAnswer from './SingleUserAnswer';
import MultiUserAnswer from './MultiUserAnswer';
import FreeResponseUserAnswer from './FreeResponseUserAnswer';
import DateUserAnswer from './DateUserAnswer';
import NameUserAnswer from './NameUserAnswer';
import CurrencyUserAnswer from './CurrencyUserAnswer';
import NumberUserAnswer from './NumberUserAnswer';
import GridUserAnswer from './GridUserAnswer';
import ParticipantReportUserAnswer from './ParticipantReportUserAnswer';
import SliderUserAnswer from './SliderUserAnswer';
import ThirdPartyReportUserAnswer from './ThirdPartyReportUserAnswer';
import PhoneUserAnswer from './PhoneUserAnswer';

type Props = {
  question: Question;
  answer: Nullable<Answer>;
};

const UserAnswer = ({ question, answer }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { body, type: questionType } = question;

  const renderUserAnswerByQuestionType = (): JSX.Element[] | JSX.Element => {
    if (questionTypesWithoutAnswers.includes(questionType)) {
      return (
        <Text color={themeColors.warning}>
          {formatMessage(messages[questionType])}
        </Text>
      );
    }

    if (!answer) return <></>;

    switch (answer.type) {
      case AnswerType.SINGLE:
        return (
          <SingleUserAnswer
            questionBody={body as QuestionBody<string>}
            answer={answer}
          />
        );
      case AnswerType.MULTIPLE:
        return (
          <MultiUserAnswer
            questionBody={body as QuestionBody<string>}
            answer={answer}
          />
        );
      case AnswerType.FREE_RESPONSE:
        return <FreeResponseUserAnswer answer={answer} />;
      case AnswerType.DATE:
        return <DateUserAnswer answer={answer} />;
      case AnswerType.NAME:
        return <NameUserAnswer answer={answer} />;
      case AnswerType.CURRENCY:
        return <CurrencyUserAnswer answer={answer} />;
      case AnswerType.NUMBER:
        return <NumberUserAnswer answer={answer} />;
      case AnswerType.GRID:
        return (
          <GridUserAnswer
            questionBody={body as QuestionBody<GridQuestionPayload>}
            answer={answer}
          />
        );
      case AnswerType.SLIDER:
        return (
          <SliderUserAnswer
            questionBody={body as QuestionBody<SliderQuestionPayload>}
            answer={answer}
          />
        );
      case AnswerType.PARTICIPANT_REPORT:
        return <ParticipantReportUserAnswer answer={answer} />;
      case AnswerType.THIRD_PARTY:
        return (
          <ThirdPartyReportUserAnswer
            questionBody={body as QuestionBody<string>}
            answer={answer}
          />
        );
      case AnswerType.PHONE:
        return <PhoneUserAnswer answer={answer} />;
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
