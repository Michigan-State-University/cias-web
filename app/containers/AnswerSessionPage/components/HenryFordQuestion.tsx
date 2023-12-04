import React, { useState, useEffect } from 'react';

import { HenryFordQuestionAnswer } from 'models/Answer';
import { HenryFordQuestionDTO } from 'models/Question';

import SingleQuestionLayout from '../layouts/SingleQuestionLayout';
import { SharedProps } from '../types';

const HenryFordQuestion = ({
  question,
  answerBody,
  selectAnswer,
  saveAnswer,
  disabled,
  dynamicElementsDirection,
}: SharedProps<
  HenryFordQuestionDTO,
  HenryFordQuestionAnswer['decryptedBody']['data']
>) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<Nullable<number>>(null);
  const {
    body: {
      data,
      variable: { name },
    },
    settings: { proceed_button: proceedButton },
    id,
  } = question;

  useEffect(() => {
    setSelectedAnswerIndex(answerBody.length ? answerBody[0].index : null);
  }, [id]);

  const handleClick = (value: string, index: number, hfhValue: string) => {
    selectAnswer([
      {
        var: name,
        value,
        index,
        hfhValue,
      },
    ]);
    setSelectedAnswerIndex(index);

    if (!proceedButton) {
      saveAnswer();
    }
  };

  return (
    <SingleQuestionLayout
      data={data}
      handleClick={handleClick}
      questionId={id}
      selectedAnswerIndex={selectedAnswerIndex}
      disabled={disabled}
      dynamicElementsDirection={dynamicElementsDirection}
    />
  );
};

export default HenryFordQuestion;
