import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { NameAnswer } from 'models/Answer';

import Comment from 'components/Text/Comment';
import Row from 'components/Row';

import messages from './messages';
import { formatAnswerValueForMarkup } from './utils';

type Props = {
  answer: NameAnswer;
};

const NameUserAnswer = ({
  answer: {
    decryptedBody: { data },
  },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const { name, phoneticName } = data[0].value;

  return (
    <Row gap="15px 30px" flexWrap="wrap">
      <Comment fontWeight="medium">
        <Markup
          content={formatMessage(messages.name, {
            name: formatAnswerValueForMarkup(name),
          })}
          noWrap
        />
      </Comment>
      <Comment fontWeight="medium">
        <Markup
          content={formatMessage(messages.spelling, {
            spelling: formatAnswerValueForMarkup(phoneticName ?? ''),
          })}
          noWrap
        />
      </Comment>
    </Row>
  );
};
export default NameUserAnswer;
