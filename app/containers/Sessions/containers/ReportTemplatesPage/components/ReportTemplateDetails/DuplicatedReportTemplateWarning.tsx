import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { colors, themeColors } from 'theme';

import WarningIcon from 'assets/svg/warning-circle.svg';

import globalMessages from 'global/i18n/globalMessages';

import Row from 'components/Row';
import Icon from 'components/Icon';
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
      flexWrap="wrap"
    >
      <Row gap={12} align="center" flexWrap="wrap">
        <Icon src={WarningIcon} stroke={themeColors.text} />
        <Text fontSize={15} lineHeight={1.3} maxWidth={290}>
          {formatMessage(messages.duplicatedReportTemplateWarning)}
        </Text>
      </Row>
      <Row flexShrink={0}>
        <TextButton onClick={onClose}>
          {formatMessage(globalMessages.dontShowAgain)}
        </TextButton>
      </Row>
    </Row>
  );
};
