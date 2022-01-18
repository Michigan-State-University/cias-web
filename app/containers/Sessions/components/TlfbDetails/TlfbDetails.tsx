import React from 'react';

import { QuestionGroup } from 'models/QuestionGroup';

import { TlfbDetailsContainer } from './styled';

export type TlfbDetailsProps = {
  questionGroup: QuestionGroup;
  changeGroupName: (newName: string) => void;
};

export const TlfbDetails = ({ questionGroup }: TlfbDetailsProps) => (
  <TlfbDetailsContainer>{JSON.stringify(questionGroup)}</TlfbDetailsContainer>
);
