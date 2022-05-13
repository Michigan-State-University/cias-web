import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import globalMessages from 'global/i18n/globalMessages';

import { TextMessageType } from 'models/TextMessage';
import { textMessageTypeColors } from 'models/TextMessage/TextMessageTypeColors';

import { fontSizes, themeColors } from 'theme';

import StyledCircle from 'components/Circle/StyledCircle';
import Text from 'components/Text';
import Row from 'components/Row';

type Props = {
  type: TextMessageType;
} & Record<string, unknown>; // Extend Record type until css props are typed

const TextMessageTypeIndicatorComponent = ({
  type,
  ...restProps
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  return (
    <Row align="center" gap={4} {...restProps}>
      <StyledCircle background={textMessageTypeColors.get(type)} size="9px" />
      <Text
        fontSize={fontSizes.extraSmall}
        fontWeight="medium"
        color={themeColors.comment}
        whiteSpace="nowrap"
      >
        {formatMessage(globalMessages[type])}
      </Text>
    </Row>
  );
};

export const TextMessageTypeIndicator = memo(TextMessageTypeIndicatorComponent);
