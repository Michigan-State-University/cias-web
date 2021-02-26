/**
 *
 * Loader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import Spinner from 'components/Spinner';

import { FillScreenLoader, InlineLoader } from './styled';

const Loader = ({ color, hidden, size, type, width, ...styleProps }) => {
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

Loader.propTypes = {
  color: PropTypes.string,
  hidden: PropTypes.bool,
  size: PropTypes.number,
  type: PropTypes.oneOf(['inline', 'absolute']),
};

Loader.defaultProps = {
  color: themeColors.secondary,
  type: 'absolute',
};

export default Loader;
