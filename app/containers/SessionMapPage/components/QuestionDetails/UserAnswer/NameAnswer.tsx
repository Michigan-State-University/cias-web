import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { Answer, NameAnswerValue } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Row from 'components/Row';

import messages from './messages';
import { formatAnswerValueForMarkup } from './utils';

type Props = {
  answer: Answer<NameAnswerValue>;
};

const NameAnswer = ({
  answer: {
    decryptedBody: { data },
  },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const { name, phoneticName } = data[0].value;

  return (
    <Row gap="15px 30px" flexWrap="wrap">
      <Text color={themeColors.comment}>
        <Markup
          content={formatMessage(messages.name, {
            name: formatAnswerValueForMarkup(name),
          })}
          noWrap
        />
      </Text>
      <Text color={themeColors.comment}>
        <Markup
          content={formatMessage(messages.spelling, {
            spelling: formatAnswerValueForMarkup(phoneticName),
          })}
          noWrap
        />
      </Text>
    </Row>
  );
};
export default NameAnswer;
