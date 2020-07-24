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
  right,
  top,
  controlled,
  visible,
}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const togglePopup = willBeVisible => () => {
    if (!controlled) setPopupVisible(willBeVisible);
  };
  return (
    <Container
      onMouseEnter={togglePopup(true)}
      onMouseLeave={togglePopup(false)}
    >
      {children}
      {((!controlled && popupVisible) || visible) && (
        <PopupElement right={right} top={top}>
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
  right: PropTypes.bool,
  top: PropTypes.bool,
  controlled: PropTypes.bool,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  right: false,
  top: false,
  controlled: false,
};

export default Popup;
