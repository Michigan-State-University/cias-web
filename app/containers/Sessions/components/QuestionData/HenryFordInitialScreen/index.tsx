import React from 'react';

import HenryFordInitialScreenLayout from 'containers/AnswerSessionPage/layouts/HenryFordInitialScreenLayout';

import { CommonQuestionProps } from '../types';

type Props = CommonQuestionProps;

const HenryFordInitialScreen: React.FC<Props> = () => (
  <HenryFordInitialScreenLayout
    disabled
    continueButtonDisabled
    previewMedicalNumberInput
  />
);

export default HenryFordInitialScreen;
