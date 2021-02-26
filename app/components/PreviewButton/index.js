/**
 *
 * Checkbox
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import eye from 'assets/svg/eye.svg';
import { Button } from 'components/Button';
import { colors } from 'theme';
import { PreviewText, StyledPreviewButton } from './styled';

const PreviewButton = ({ previewDisabled, text, handleClick }) => (
  <StyledPreviewButton>
    <Button
      disabled={previewDisabled}
      onClick={handleClick}
      inverted
      height={35}
      color="secondary"
      borderRadius={5}
      px={11}
      mx={5}
    >
      <Icon
        src={eye}
        alt="eye"
        mx={6}
        fill={previewDisabled ? colors.grey : null}
      />
      <PreviewText className="preview-text">{text}</PreviewText>
    </Button>
  </StyledPreviewButton>
);

PreviewButton.propTypes = {
  previewDisabled: PropTypes.bool,
  text: PropTypes.string,
  handleClick: PropTypes.func,
};

export default PreviewButton;
