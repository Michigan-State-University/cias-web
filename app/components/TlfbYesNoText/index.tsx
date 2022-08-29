import React from 'react';
import { FormattedMessage } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';
import Text from 'components/Text';
import { colors } from 'theme';

type Props = {
  yes: boolean;
};

const TlfbYesNoText = ({ yes }: Props) => {
  const color = yes ? colors.brightNavyBlue : colors.purplePlum;
  const text = globalMessages[yes ? 'yes' : 'no'];

  return (
    <Text fontWeight="bold" color={color}>
      <FormattedMessage {...text} />
    </Text>
  );
};

export default TlfbYesNoText;
