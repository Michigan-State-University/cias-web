import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { themeColors } from 'theme';

import WarningIcon from 'assets/svg/warning-circle.svg';

import globalMessages from 'global/i18n/globalMessages';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { TextButton } from 'components/Button';
import {
  LayoutProps,
  MarginProps,
  PositioningProps,
  TextProps,
} from 'components/BaseComponentStyles';

import { AlertType } from './types';
import { getBackgroundColorByType } from './utils';

export type Props = {
  content: string;
  contentProps?: Partial<
    TextProps & MarginProps & LayoutProps & PositioningProps
  >;
  onDismiss?: () => void;
  type: AlertType;
  wrap?: boolean;
} & Partial<MarginProps & LayoutProps & PositioningProps>;

export const Alert: FC<Props> = ({
  content,
  contentProps,
  onDismiss,
  type,
  wrap = true,
  ...props
}) => {
  const { formatMessage } = useIntl();

  return (
    <Row
      borderRadius="8px"
      py={12}
      px={16}
      gap={16}
      justify="between"
      flexWrap={wrap ? 'wrap' : 'nowrap'}
      background={getBackgroundColorByType(type)}
      {...props}
    >
      <Row gap={12} align="center" flexWrap={wrap ? 'wrap' : 'nowrap'}>
        <Icon src={WarningIcon} stroke={themeColors.text} />
        <Text fontSize={15} lineHeight={1.3} textAlign="left" {...contentProps}>
          {content}
        </Text>
      </Row>
      {onDismiss && (
        <Row flexShrink={0}>
          <TextButton onClick={onDismiss}>
            {formatMessage(globalMessages.dontShowAgain)}
          </TextButton>
        </Row>
      )}
    </Row>
  );
};
