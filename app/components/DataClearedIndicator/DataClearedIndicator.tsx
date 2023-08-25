import { CSSProperties, FC } from 'react';

import { useIntl } from 'react-intl';

import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import messages from './messages';

export type Props = {
  opacity: CSSProperties['opacity'];
  showTooltip?: boolean;
};

export const DataClearedIndicator: FC<Props> = ({ opacity, showTooltip }) => {
  const { formatMessage } = useIntl();

  return (
    <HelpIconTooltip
      id="collaborating-intervetion-info"
      tooltipContent={showTooltip && formatMessage(messages.tooltipContext)}
    >
      <Text fontWeight="medium" fontSize={12} opacity={opacity}>
        {formatMessage(messages.dataCleared)}
      </Text>
    </HelpIconTooltip>
  );
};
