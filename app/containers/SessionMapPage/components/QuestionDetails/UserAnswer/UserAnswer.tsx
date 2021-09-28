import React from 'react';
import { useIntl } from 'react-intl';

import {
  GridQuestionPayload,
  Question,
  QuestionBody,
  SliderQuestionPayload,
} from 'global/types/question';

import {
  Answer,
  CurrencyAnswer,
  DateAnswer,
  FreeResponseAnswer,
  GridAnswer,
  MultiAnswer,
  NameAnswer,
  NumberAnswer,
  ParticipantReportAnswer,
  SingleAnswer,
  SliderAnswer,
} from 'models/Answer';
import { QuestionTypes } from 'models/Question/QuestionDto';

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
        return (
          <SingleUserAnswer
            questionBody={body as QuestionBody<string>}
            answer={answer as SingleAnswer}
          />
        );
      case QuestionTypes.MULTIPLE:
        return (
          <MultiUserAnswer
            questionBody={body as QuestionBody<string>}
            answer={answer as MultiAnswer}
          />
        );
      case QuestionTypes.FREE_RESPONSE:
        return <FreeResponseUserAnswer answer={answer as FreeResponseAnswer} />;
      case QuestionTypes.DATE:
        return <DateUserAnswer answer={answer as DateAnswer} />;
      case QuestionTypes.NAME:
        return <NameUserAnswer answer={answer as NameAnswer} />;
      case QuestionTypes.CURRENCY:
        return <CurrencyUserAnswer answer={answer as CurrencyAnswer} />;
      case QuestionTypes.NUMBER:
        return <NumberUserAnswer answer={answer as NumberAnswer} />;
      case QuestionTypes.GRID:
        return (
          <GridUserAnswer
            questionBody={body as QuestionBody<GridQuestionPayload>}
            answer={answer as GridAnswer}
          />
        );
      case QuestionTypes.SLIDER:
        return (
          <SliderUserAnswer
            questionBody={body as QuestionBody<SliderQuestionPayload>}
            answer={answer as SliderAnswer}
          />
        );
      case QuestionTypes.PARTICIPANT_REPORT:
        return (
          <ParticipantReportUserAnswer
            answer={answer as ParticipantReportAnswer}
          />
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
