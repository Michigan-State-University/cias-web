import React from 'react';

import { htmlToPlainText } from 'utils/htmlToPlainText';

import { Answer } from 'models/Answer';

import Comment from 'components/Text/Comment';

type Props = {
  answer: Answer<string>;
};

const FreeResponseAnswer = ({ answer }: Props): JSX.Element => (
  <Comment>{htmlToPlainText(answer.decryptedBody.data[0].value)}</Comment>
);

export default FreeResponseAnswer;
