import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { colors, themeColors } from 'theme';
import { Markup } from 'interweave';

import WarningIcon from 'assets/svg/warning-circle.svg';

import globalMessages from 'global/i18n/globalMessages';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Column from 'components/Column';
import Text from 'components/Text';
import { TextButton } from 'components/Button';

import messages from '../../messages';

export type Props = {
  onClose: () => void;
};

export const DuplicatedReportTemplateWarning: FC<Props> = ({ onClose }) => {
  const { formatMessage } = useIntl();

  return (
    <Row
      mb={24}
      borderRadius="8px"
      background={colors.chardonnay}
      py={12}
      px={16}
      gap={16}
      justify="between"
    >
      <Row gap={12} align="center">
        <Icon src={WarningIcon} stroke={themeColors.text} />
        <Column>
          <Text fontSize={15} lineHeight={1.3}>
            <Markup
              noWrap
              content={formatMessage(messages.duplicatedReportTemplateWarning)}
            />
          </Text>
        </Column>
      </Row>
      <Row flexShrink={0}>
        <TextButton onClick={onClose}>
          {formatMessage(globalMessages.close)}
        </TextButton>
      </Row>
    </Row>
  );
};
