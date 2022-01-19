/**
 *
 * Icon
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';

import * as Styled from './styled';

type IconProps = {
  src: string | SVGElement;
  className?: string;
  fill?: string;
  stroke?: string;
  alt?: string;
  onClick?: () => {};
};

const Icon = ({
  src,
  className,
  fill,
  stroke,
  alt,
  onClick,
  ...restProps
}: IconProps) => (
  <Styled.SvgWrapper>
    <Styled.SVG
      src={src}
      className={className}
      fill={fill}
      stroke={stroke}
      alt={alt}
      onClick={onClick}
      {...restProps}
    />
  </Styled.SvgWrapper>
);

Icon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  alt: '',
};

export default Icon;
