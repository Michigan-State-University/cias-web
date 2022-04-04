import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';

import TextButton from './TextButton';

const ImageButton = React.forwardRef(
  (
    {
      title,
      src,
      fill,
      stroke,
      disabled,
      onClick,
      loading,
      iconProps,
      ...props
    },
    ref,
  ) => (
    <TextButton
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      loading={loading}
      loaderProps={{
        height: 'auto',
        width: 'auto',
        'aria-label': `${title} loader`,
        ...props,
      }}
      buttonProps={{
        type: 'button',
        title,
        'aria-label': title,
        ...props,
      }}
    >
      <Icon src={src} fill={fill} stroke={stroke} {...iconProps} />
    </TextButton>
  ),
);

ImageButton.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  iconProps: PropTypes.object,
};

export { ImageButton };
