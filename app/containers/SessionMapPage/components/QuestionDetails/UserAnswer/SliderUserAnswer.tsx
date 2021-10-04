import React from 'react';

import { QuestionBody, SliderQuestionPayload } from 'models/Question';
import { SliderAnswer } from 'models/Answer';

import { visualAnalogScaleLabelStyles } from 'theme';

import AppSlider from 'components/AppSlider';
import Box from 'components/Box';

type Props = {
  questionBody: QuestionBody<SliderQuestionPayload>;
  answer: SliderAnswer;
};

const SliderUserAnswer = ({
  answer,
  questionBody: { data: questionData },
}: Props): JSX.Element => {
  const { start_value: startValue, end_value: endValue } =
    questionData[0].payload;

  const marks = {
    0: {
      label: <>{startValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
    100: {
      label: <>{endValue}</>,
      style: visualAnalogScaleLabelStyles,
    },
  };

  return (
    <Box mt={45} mx={15}>
      <AppSlider
        // @ts-ignore
        value={answer.decryptedBody.data[0].value}
        showValue
        disabled
        marks={marks}
      />
    </Box>
  );
};

export default SliderUserAnswer;
