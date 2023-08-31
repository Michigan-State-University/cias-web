/**
 *
 * Icon
 *
 */

import React, { CSSProperties } from 'react';
import { Props as SVGProperies } from 'react-inlinesvg';

import {
  MarginProps,
  LayoutProps,
  TextProps,
} from 'components/BaseComponentStyles';

import * as Styled from './styled';

export type Props = {
  src: SVGElement | string;
  alt?: string;
  inline?: boolean;
  wrapperProps?: LayoutProps & TextProps;
} & Omit<SVGProperies, 'src'> &
  CSSProperties &
  MarginProps &
  LayoutProps;

const Icon = ({
  src,
  alt = '',
  inline = false,
  wrapperProps,
  ...restProps
}: Props) => (
  <Styled.SvgWrapper inline={inline} {...wrapperProps}>
    <Styled.SVG src={src} alt={alt} {...restProps} />
  </Styled.SvgWrapper>
);

export default Icon;
