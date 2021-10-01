import React from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { FreeResponseAnswer } from 'models/Answer';

import Comment from 'components/Text/Comment';

type Props = {
  answer: FreeResponseAnswer;
};

const FreeResponseUserAnswer = ({ answer }: Props): JSX.Element => (
  <Comment>{htmlToPlainText(answer.decryptedBody.data[0].value)}</Comment>
);

export default FreeResponseUserAnswer;
