import React from 'react';

import ErrorAlert from 'components/ErrorAlert';
import {
  gridQuestion,
  multiQuestion,
  numberQuestion,
  singleQuestion,
  visualAnalogueScaleQuestion,
  textboxQuestion,
  informationQuestion,
  urlQuestion,
  feedbackQuestion,
  finishQuestion,
} from 'models/Intervention/QuestionTypes';
import FinishScreen from './FinishScreen';
import UrlQuestion from './UrlQuestion';
import InformationSlide from './InformationSlide';
import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import GridQuestion from './GridQuestion';
import VisualAnalogueScaleQuestion from './VisualAnalogueScaleQuestion';
import TextBoxQuestion from './TextBoxQuestion';
import NumberQuestion from './NumberQuestion';
import FeedbackQuestion from './FeedbackQuestion';

export const renderQuestionByType = (question, sharedProps) => {
  const { type } = question;
  switch (type) {
    case singleQuestion.id:
      return <SingleQuestion question={question} {...sharedProps} />;
    case multiQuestion.id:
      return <MultipleQuestion question={question} {...sharedProps} />;
    case gridQuestion.id:
      return <GridQuestion question={question} {...sharedProps} />;
    case visualAnalogueScaleQuestion.id:
      return (
        <VisualAnalogueScaleQuestion question={question} {...sharedProps} />
      );
    case feedbackQuestion.id:
      return <FeedbackQuestion question={question} {...sharedProps} />;
    case textboxQuestion.id:
      return <TextBoxQuestion question={question} {...sharedProps} />;
    case numberQuestion.id:
      return <NumberQuestion question={question} {...sharedProps} />;
    case informationQuestion.id:
      return <InformationSlide {...sharedProps} />;
    case urlQuestion.id:
      return <UrlQuestion question={question} {...sharedProps} />;
    case finishQuestion.id:
      return <FinishScreen question={question} {...sharedProps} />;
    default:
      return <ErrorAlert errorText={`CANNOT RENDER ${type}`} />;
  }
};

export default renderQuestionByType;
