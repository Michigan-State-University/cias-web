import React from 'react';
import { FormattedMessage } from 'react-intl';

import Text from 'components/Text';
import globalMessages from 'global/i18n/globalMessages';
import { colors } from 'theme';

import messages from '../messages';

export const SubstancesCounter = ({
  substanceCount,
}: {
  substanceCount: number;
}) => {
  if (substanceCount === 0)
    return (
      <Text fontWeight="bold" color={colors.jungleGreen}>
        <FormattedMessage {...globalMessages.no} />
      </Text>
    );

  if (substanceCount > 0)
    return (
      <Text
        fontWeight="bold"
        color={colors.alert}
        whiteSpace="nowrap"
        maxWidth="100%"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        <FormattedMessage
          {...messages.substances}
          values={{ count: substanceCount }}
        />
      </Text>
    );

  return null;
};

export default SubstancesCounter;
