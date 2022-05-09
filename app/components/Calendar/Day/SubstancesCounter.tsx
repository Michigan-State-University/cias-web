import React from 'react';
import { FormattedMessage } from 'react-intl';

import Text from 'components/Text';
import globalMessages from 'global/i18n/globalMessages';
import { colors } from 'theme';

import messages from '../messages';

export const SubstancesCounter = ({
  substanceCount,
}: {
  substanceCount: number | boolean;
}) => {
  if (substanceCount === true)
    return (
      <Text fontWeight="bold" color={colors.brightNavyBlue}>
        <FormattedMessage {...globalMessages.yes} />
      </Text>
    );

  if (substanceCount === 0)
    return (
      <Text fontWeight="bold" color={colors.purplePlum}>
        <FormattedMessage {...globalMessages.no} />
      </Text>
    );

  if (substanceCount > 0)
    return (
      <Text
        fontWeight="bold"
        color={colors.brightNavyBlue}
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
