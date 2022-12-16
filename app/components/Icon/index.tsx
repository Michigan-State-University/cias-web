/**
 *
 * Icon
 *
 */

import React, { CSSProperties } from 'react';
import { Props as SVGProperies } from 'react-inlinesvg';

import { MarginProps, LayoutProps } from 'components/BaseComponentStyles';

import * as Styled from './styled';

export type Props = {
  src: SVGElement | string;
  alt?: string;
  inline?: boolean;
} & Omit<SVGProperies, 'src'> &
  CSSProperties &
  MarginProps &
  LayoutProps;

const Icon = ({ src, alt = '', inline = false, ...restProps }: Props) => (
  <Styled.SvgWrapper inline={inline}>
    <Styled.SVG src={src} alt={alt} {...restProps} />
  </Styled.SvgWrapper>
);

export default Icon;
