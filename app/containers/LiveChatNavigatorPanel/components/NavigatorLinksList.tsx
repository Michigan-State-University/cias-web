import React from 'react';
import { useIntl } from 'react-intl';

import { NavigatorLink } from 'models/NavigatorSetup';

import Text from 'components/Text';
import Column from 'components/Column';
import { PrimaryLink } from 'components/Links';

import messages from '../messages';

export type Props = { navigatorLinks: NavigatorLink[] };

const NavigatorLinksList = ({ navigatorLinks }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <Text mb={8} fontWeight="bold" lineHeight="22px">
        {formatMessage(messages.usefulLinks)}
      </Text>
      <Column gap={4}>
        {navigatorLinks.map(({ displayName, url, id }) => (
          <PrimaryLink key={id} href={url} target="_blank">
            {displayName}
          </PrimaryLink>
        ))}
      </Column>
    </div>
  );
};

export default NavigatorLinksList;
