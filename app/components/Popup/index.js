/**
 *
 * Popup
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, PopupElement } from './styled';

export const Popup = ({
  children,
  popupContent,
  verticalPosition,
  horizontalPosition,
  controlled,
  visible,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = (willBeVisible) => () => {
    if (!controlled) setPopupVisible(willBeVisible);
  };
  return (
    <Container
      onMouseEnter={togglePopup(true)}
      onMouseLeave={togglePopup(false)}
    >
      {children}
      {((!controlled && popupVisible) || visible) && (
        <PopupElement
          verticalPosition={verticalPosition}
          horizontalPosition={horizontalPosition}
        >
          {popupContent}
        </PopupElement>
      )}
    </Container>
  );
};

Popup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  popupContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),
  controlled: PropTypes.bool,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  verticalPosition: 'top',
  horizontalPosition: 'center',
  controlled: false,
};

export default Popup;
