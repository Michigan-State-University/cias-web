import React, { memo } from 'react';

import { hexToRgb, themeColors } from 'theme';

import Box from 'components/Box';
import Column from 'components/Column';
import Img from 'components/Img';
import { FullWidthRadio, LabelPosition } from 'components/Radio';
import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';

type Props = {
  disabled: boolean;
  onClick: () => void;
  listIcon: string;
  label: string;
  name: string;
  checked: boolean;
  id: string;
};

const CopyRadioRow = ({
  disabled,
  onClick,
  listIcon,
  label,
  name,
  checked,
  id,
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
    <FullWidthRadio
      id={`group-to-choose-${id}`}
      aria-label={name}
      checked={checked}
      onChange={undefined}
      labelPosition={LabelPosition.Left}
    >
      <Column>
        <Box maxWidth={170}>
          {/* @ts-ignore */}
          <EllipsisText text={name} fontSize={16} />
        </Box>
        {label}
      </Column>
    </FullWidthRadio>
  </Row>
);

export default memo(CopyRadioRow);
