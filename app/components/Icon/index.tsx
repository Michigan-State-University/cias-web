/**
 *
 * Icon
 *
 */

import React, { CSSProperties } from 'react';
import { Props as SVGProperies } from 'react-inlinesvg';

import * as Styled from './styled';

type Props = {
  src: SVGElement | string;
  alt?: string;
} & Omit<SVGProperies, 'src'> &
  CSSProperties;

const Icon = ({ src, alt = '', ...restProps }: Props) => (
  <Styled.SvgWrapper>
    <Styled.SVG src={src} alt={alt} {...restProps} />
  </Styled.SvgWrapper>
);

export default Icon;
