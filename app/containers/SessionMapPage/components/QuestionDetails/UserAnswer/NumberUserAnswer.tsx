import React from 'react';

import { NumberAnswer } from 'models/Answer';

import { colors } from 'theme';

import Text from 'components/Text';

type Props = {
  answer: NumberAnswer;
};

const NumberUserAnswer = ({ answer }: Props): JSX.Element => (
  <Text color={colors.jungleGreen} fontWeight="bold">
    {answer.decryptedBody.data[0].value}
  </Text>
);

export default NumberUserAnswer;
