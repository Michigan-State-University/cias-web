/**
 *
 * Loader
 *
 */

import React from 'react';

import { themeColors } from 'theme';

import Spinner from 'components/Spinner';

import { FillScreenLoader, InlineLoader } from './styled';

type Props = {
  color?: string;
  hidden?: boolean;
  size?: number;
  width?: number;
  type?: 'inline' | 'absolute';
} & Record<string, unknown>;

const Loader = ({
  color = themeColors.secondary,
  hidden,
  size,
  type = 'absolute',
  width,
  ...styleProps
}: Props) => {
  const typeSize = size || (type === 'absolute' ? 100 : 50);

  const fullScreenLoader = (
    <FillScreenLoader
      data-testid="fullscreen-loader"
      hidden={hidden}
      {...styleProps}
    >
      <Spinner color={color} size={typeSize} width={width} />
    </FillScreenLoader>
  );

  const containerLoader = (
    <InlineLoader data-testid="inline-loader" hidden={hidden} {...styleProps}>
      <Spinner color={color} size={typeSize} width={width} />
    </InlineLoader>
  );

  switch (type) {
    case 'inline':
      return containerLoader;
    case 'absolute':
      return fullScreenLoader;
    default:
      return fullScreenLoader;
  }
};

export default Loader;
