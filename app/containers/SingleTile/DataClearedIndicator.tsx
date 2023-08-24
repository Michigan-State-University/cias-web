import { useIntl } from 'react-intl';

import Text from 'components/Text';

import messages from './messages';

export const DataClearedIndicator = () => {
  const { formatMessage } = useIntl();

  return (
    <Text fontWeight="medium" fontSize={12} opacity={0.7}>
      {formatMessage(messages.dataCleared)}
    </Text>
  );
};
