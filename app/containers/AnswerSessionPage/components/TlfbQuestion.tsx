import React from 'react';

import Calendar from 'components/Calendar';
import TlfbTitle from 'components/TlfbTitle';

import { TlfbContainer } from './styled';

const TlfbQuestion = () => (
  <TlfbContainer>
    <TlfbTitle
      smallText="Sample question title"
      bigText="Mark the days when you used substances, specify its type and amount"
    />
    <Calendar />
  </TlfbContainer>
);

export default TlfbQuestion;
