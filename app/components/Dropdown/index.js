import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Comment from 'components/Comment';
import dots from 'assets/svg/dots.svg';
import { borders, colors } from 'theme';

import { ContentContainer, ImageContainer, StyledRow } from './styled';

const Dropdown = props => {
  const { options, id, ...restProps } = props;
  const [open, setOpen] = useState(false);

  const dropdown = useRef(null);

  const handleClick = event => {
    const { target } = event;
    if (dropdown.current && !dropdown.current.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Box
      display="flex"
      borderRadius="0"
      justify="end"
      align="start"
      position="relative"
      height="100%"
      width="100%"
      {...restProps}
    >
      <ImageContainer
        ref={dropdown}
        key={`el-img-${id}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Img src={dots} alt="dots" />
      </ImageContainer>
      {open && (
        <ContentContainer>
          <Column>
            {options.map(option => (
              <StyledRow
                key={`el-dropdown-${option.id}`}
                padding={8}
                borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
                  colors.greyishBlue
                }`}
                onClick={option.action}
              >
                <Comment color={option.color}>{option.label}</Comment>
              </StyledRow>
            ))}
          </Column>
        </ContentContainer>
      )}
    </Box>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
};

export default Dropdown;
