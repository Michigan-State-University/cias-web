import React, { memo } from 'react';

import { hexToRgb, themeColors } from 'theme';

import arrowRightActive from 'assets/svg/arrow-right-active.svg';

import Box from 'components/Box';
import Column from 'components/Column';
import Img from 'components/Img';
import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';
import Icon from 'components/Icon';

type Props = {
  disabled: boolean;
  onClick: () => void;
  listIcon: string;
  label: string;
  name: string;
};

const CopyNavigationRow = ({
  disabled,
  onClick,
  listIcon,
  label,
  name,
}: Props): JSX.Element => (
  <Row
    width="100%"
    disabled={disabled}
    clickable
    align="center"
    justify="start"
    hoverColor={`rgba(${hexToRgb(themeColors.secondary)}, 0.1)`}
    onClick={onClick}
    px={25}
    py={15}
  >
    <Img src={listIcon} mr={10} />

    <Column>
      <Box maxWidth={170}>
        {/* @ts-ignore */}
        <EllipsisText text={name} fontSize={16} />
      </Box>
      {label}
    </Column>

    {/* @ts-ignore */}
    <Icon src={arrowRightActive} />
  </Row>
);

export default memo(CopyNavigationRow);
