import React from 'react';
import { useIntl } from 'react-intl';

import {
  GridQuestionDTO,
  MultipleQuestionDTO,
  QuestionDTO,
  SingleQuestionDTO,
  SliderQuestionDTO,
  ThirdPartyReportQuestionDTO,
} from 'models/Question';
import { Answer, AnswerType } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';

import { QUESTIONS_WITHOUT_ANSWERS } from '../../../constants';
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
  question: QuestionDTO;
  answer: Nullable<Answer>;
};

const UserAnswer = ({ question, answer }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { type: questionType } = question;

  const renderUserAnswerByQuestionType = (): JSX.Element[] | JSX.Element => {
    if (QUESTIONS_WITHOUT_ANSWERS.includes(questionType)) {
      return (
        <Text color={themeColors.warning}>
          {/* @ts-ignore */}
          {formatMessage(messages[questionType])}
        </Text>
      );
    }

    if (!answer) return <></>;

    switch (answer.type) {
      case AnswerType.SINGLE:
        return (
          <SingleUserAnswer
            question={question as SingleQuestionDTO}
            answer={answer}
          />
        );
      case AnswerType.MULTIPLE:
        return (
          <MultiUserAnswer
            question={question as MultipleQuestionDTO}
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
            question={question as GridQuestionDTO}
            answer={answer}
          />
        );
      case AnswerType.SLIDER:
        return (
          <SliderUserAnswer
            question={question as SliderQuestionDTO}
            answer={answer}
          />
        );
      case AnswerType.PARTICIPANT_REPORT:
        return <ParticipantReportUserAnswer answer={answer} />;
      case AnswerType.THIRD_PARTY:
        return (
          <ThirdPartyReportUserAnswer
            question={question as ThirdPartyReportQuestionDTO}
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
