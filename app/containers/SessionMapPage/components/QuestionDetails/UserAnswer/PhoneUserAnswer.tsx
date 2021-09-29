import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

import { PhoneAnswer } from 'models/Answer';

import { themeColors } from 'theme';

import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';

import messages from './messages';
import { formatAnswerValueForMarkup } from './utils';

type Props = {
  answer: PhoneAnswer;
};

const PhoneUserAnswer = ({
  answer: {
    decryptedBody: { data },
  },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const { value } = data[0];
  const answered = typeof value !== 'string';

  const formattedPhoneNumber = answered
    ? parsePhoneNumberFromString(
        value.number,
        value.iso as CountryCode,
      )?.formatNational() ?? ''
    : '';

  return (
    <Row gap="15px 30px" flexWrap="wrap">
      <Row align="center">
        <Comment fontWeight="medium" mr={8}>
          {formatMessage(messages.phonePrefix)}
        </Comment>
        {answered && <FlagIcon code={value.iso as FlagIconCode} size={16} />}
        <Text color={themeColors.primary} fontWeight="bold" ml={4}>
          {answered ? `${value.iso} ${value.prefix}` : ''}
        </Text>
      </Row>
      <Comment fontWeight="medium">
        <Markup
          content={formatMessage(messages.phoneNumber, {
            number: formatAnswerValueForMarkup(formattedPhoneNumber),
          })}
          noWrap
        />
      </Comment>
    </Row>
  );
};
export default PhoneUserAnswer;
