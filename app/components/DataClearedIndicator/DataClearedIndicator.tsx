import React, { CSSProperties, FC } from 'react';

import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';

import Text from 'components/Text';
import { HelpIconTooltip } from 'components/HelpIconTooltip';
import Row from 'components/Row';

import messages from './messages';
import { DataClearedIcon } from './DataClearedIcon';

export type Props = {
  opacity: CSSProperties['opacity'];
  showTooltip?: boolean;
};

export const DataClearedIndicator: FC<Props> = ({ opacity, showTooltip }) => {
  const { formatMessage } = useIntl();

  return (
    <HelpIconTooltip
      id="collaborating-intervetion-info"
      tooltipContent={
        showTooltip && formatMessage(globalMessages.dataClearedInfo)
      }
    >
      <Row align="center" gap={4}>
        <DataClearedIcon />
        <Text fontWeight="medium" fontSize={12} opacity={opacity}>
          {formatMessage(messages.dataCleared)}
        </Text>
      </Row>
    </HelpIconTooltip>
  );
};
