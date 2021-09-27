import React from 'react';

import { Answer } from 'models/Answer';

import { colors } from 'theme';

import Text from 'components/Text';

type Props = {
  answer: Answer<number>;
};

const NumberAnswer = ({ answer }: Props): JSX.Element => (
  <Text color={colors.jungleGreen} fontWeight="bold">
    {answer.decryptedBody.data[0].value}
  </Text>
);

export default NumberAnswer;
