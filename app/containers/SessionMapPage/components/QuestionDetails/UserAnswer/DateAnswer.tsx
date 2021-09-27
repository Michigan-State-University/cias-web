import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { Answer } from 'models/Answer';

import { colors } from 'theme';

import Text from 'components/Text';

type Props = {
  answer: Answer<string>;
};

const DateAnswer = ({ answer }: Props): JSX.Element => {
  const { formatDate } = useIntl();

  return (
    <Text color={colors.jungleGreen} fontWeight="bold">
      {formatDate(dayjs(answer.decryptedBody.data[0].value).toDate())}
    </Text>
  );
};

export default DateAnswer;
