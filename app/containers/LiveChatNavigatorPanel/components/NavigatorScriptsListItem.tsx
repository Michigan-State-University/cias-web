import React from 'react';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import Row from 'components/Row';
import Text from 'components/Text';
import Box from 'components/Box';
import CopyToClipboard from 'components/CopyToClipboard';

import i18nMessages from '../messages';

export type Props = {
  sampleMessage: string;
  disabled: boolean;
};

const NavigatorScriptsListItem = ({ sampleMessage, disabled }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <Row align="center">
      <Box
        width="2px"
        height="100%"
        bg={colors.orchid}
        borderRadius={0}
        mr={8}
        flexShrink={0}
      />
      <Box filled minWidth="0">
        <Text lineHeight="22px" fontWeight="medium">
          {sampleMessage}
        </Text>
      </Box>
      <Box ml={16} flexShrink={0}>
        <CopyToClipboard
          // @ts-ignore
          textToCopy={sampleMessage}
          textProps={{
            color: colors.orchid,
            disabledColor: colors.manatee,
            fontWeight: 'bold',
          }}
          opacity={1}
          disabled={disabled}
        >
          {formatMessage(i18nMessages.copy)}
        </CopyToClipboard>
      </Box>
    </Row>
  );
};

export default NavigatorScriptsListItem;
