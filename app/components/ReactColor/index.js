/**
 *
 * ReactColor
 * Documentation: https://casesandberg.github.io/react-color/
 *
 */

import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker, TwitterPicker } from 'react-color';
import values from 'lodash/values';

import { themeColors } from 'theme';
import Box from 'components/Box';
import useOutsideClick from 'utils/useOutsideClick';
import Circle from 'components/Circle';
import { ColorPickerType, DEFAULT_COLORS } from './constants';

const ReactColor = ({
  type,
  color,
  onChange,
  onChangeComplete,
  style,
  ...restProps
}) => {
  const pickerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => isOpen && setIsOpen(false);

  useOutsideClick(pickerRef, close, isOpen);

  const handleChangeComplete = newColor => {
    close();

    onChangeComplete(newColor);
  };

  const renderPicker = () => {
    switch (type) {
      case ColorPickerType.TWITTER:
        return (
          <TwitterPicker
            color={color}
            onChange={onChange}
            onChangeComplete={handleChangeComplete}
            colors={DEFAULT_COLORS}
            triangle="top-right"
            {...restProps}
          />
        );
      case ColorPickerType.CHROME:
      default:
        return (
          <ChromePicker
            color={color}
            onChange={onChange}
            onChangeComplete={handleChangeComplete}
            {...restProps}
          />
        );
    }
  };

  return (
    <Box position="relative" ref={pickerRef} {...style}>
      <Box onClick={toggle} clickable>
        <Circle bg={color} child="" size="20px" />
      </Box>
      {isOpen && (
        <Box position="absolute" right={-10} zIndex={10}>
          {renderPicker()}
        </Box>
      )}
    </Box>
  );
};

ReactColor.propTypes = {
  type: PropTypes.oneOf(values(ColorPickerType)),
  color: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
};

ReactColor.defaultProps = {
  color: themeColors.secondary,
};

export { ColorPickerType };
export default memo(ReactColor);
