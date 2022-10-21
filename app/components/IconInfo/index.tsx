import React, { memo } from 'react';

import Column from 'components/Column';
import Text from 'components/Text';
import Icon, { Props as IconProps } from 'components/Icon';

export type Props = {
  maxWidth: number;
  iconSrc: IconProps['src'];
  iconAlt: IconProps['alt'];
  message: string;
};

const IconInfo = ({ maxWidth, iconSrc, iconAlt, message }: Props) => (
  <Column
    maxWidth={maxWidth}
    height="100%"
    justify="center"
    align="center"
    overflow="auto"
    gap={24}
  >
    <Icon src={iconSrc} alt={iconAlt} maxWidth="100%" />
    <Text lineHeight="24px">{message}</Text>
  </Column>
);

export default memo(IconInfo);
