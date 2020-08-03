/**
 *
 * Checkbox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import { StyledLink } from 'containers/Navbar/components/styled';
import { Button } from 'components/Button';
import eye from 'assets/svg/eye.svg';

const PreviewButton = ({ to, target, previewDisabled, text, handleClick }) => (
  <div>
    <StyledLink
      to={to}
      target={target}
      disabled={previewDisabled}
      onClick={handleClick}
    >
      <Button
        disabled={previewDisabled}
        inverted
        width="auto"
        height={35}
        color="secondary"
        borderRadius={5}
        px={11}
        mx={5}
      >
        <Img src={eye} alt="eye" mr={6} />
        {text}
      </Button>
    </StyledLink>
  </div>
);

PreviewButton.propTypes = {
  target: PropTypes.func,
  to: PropTypes.string,
  previewDisabled: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func,
};

export default PreviewButton;
