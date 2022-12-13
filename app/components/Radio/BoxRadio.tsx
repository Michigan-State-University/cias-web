import React from 'react';
// @ts-ignore
import styled, { css } from 'styled-components';

import { borders, colors, fontSizes } from 'theme';

import Text from 'components/Text';
import Radio, { Props as RadioProps } from 'components/Radio/Radio';
import Column from 'components/Column';

// @ts-ignore
const StyledRadio = styled(Radio)`
  width: 100%;
  padding: 20px;
  border: 1px solid ${colors.linkWater};
  border-radius: ${borders.borderRadius};

  label {
    align-items: start;
  }

  ${({ checked }: RadioProps) =>
    checked &&
    css`
      background-color: ${colors.zirkon};
    `}
`;

export type Props = { title: string; description?: string } & RadioProps;

export const BoxRadio = ({
  title,
  description,
  checked,
  children,
  ...props
}: Props) => (
  <StyledRadio labelOffset={8} checked={checked} {...props}>
    <Column>
      <Text fontSize={fontSizes.h3} lineHeight={1.5} fontWeight="bold">
        {title}
      </Text>
      {description && (
        <Text
          fontSize={fontSizes.small}
          lineHeight={1.5}
          fontWeight="regular"
          color={checked ? colors.bluewood : colors.stormGrey}
          mt={15}
        >
          {description}
        </Text>
      )}
      {children}
    </Column>
  </StyledRadio>
);
