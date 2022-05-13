import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import 'currency-flags/dist/currency-flags.min.css';

import { CurrencyAnswer } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';

import messages from './messages';
import { formatAnswerValueForMarkup } from './utils';

type Props = {
  answer: CurrencyAnswer;
};

const CurrencyUserAnswer = ({
  answer: {
    decryptedBody: { data },
  },
}: Props): JSX.Element => {
  const { formatMessage, formatNumber } = useIntl();

  const [currency, amount] = data[0].value.split(' ');

  return (
    <Row gap="15px 30px" flexWrap="wrap">
      <Row align="center">
        <Comment fontWeight="medium" mr={8}>
          {formatMessage(messages.currency)}
        </Comment>
        <div
          className={`currency-flag currency-flag-sm currency-flag-${currency.toLowerCase()}`}
        />
        <Text color={themeColors.primary} fontWeight="bold" ml={4}>
          {currency}
        </Text>
      </Row>
      <Comment fontWeight="medium">
        <Markup
          content={formatMessage(messages.amount, {
            amount: formatAnswerValueForMarkup(
              formatNumber(parseFloat(amount)),
            ),
          })}
          noWrap
        />
      </Comment>
    </Row>
  );
};
export default CurrencyUserAnswer;
