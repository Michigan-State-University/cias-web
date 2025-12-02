import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fontSizes } from 'theme';
import { margin, style } from 'components/BaseComponentStyles';
import Img from 'components/Img';
import { Tooltip } from 'components/Tooltip';
import crossIcon from 'assets/svg/cross.svg';

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  font-size: ${fontSizes.small};
  font-weight: 600;
  border-radius: 4px;
  background-color: ${({ color }) => color || colors.azure}10;
  color: ${({ color }) => color || colors.azure};
  white-space: nowrap;
  max-width: 200px;
  gap: 8px;
  ${margin};
  ${style};
`;

const TagText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const Tag = ({ children, color, onRemove, disabled, ...props }) => {
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove && !disabled) {
      onRemove();
    }
  };

  const tooltipText =
    typeof children === 'string' ? children : String(children);
  const tagId = `tag-tooltip-${tooltipText.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Tooltip id={tagId} text={tooltipText}>
      <TagContainer color={color} {...props}>
        <TagText>{children}</TagText>
        {onRemove && (
          <CloseButton
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove tag"
            type="button"
          >
            <Img src={crossIcon} alt="Remove" width={10} height={10} />
          </CloseButton>
        )}
      </TagContainer>
    </Tooltip>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Tag;
