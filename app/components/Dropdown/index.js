import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { outsideClickHandler } from 'utils/outsideClickHandler';

import Img from 'components/Img';
import Box from 'components/Box';
import Column from 'components/Column';
import Row from 'components/Row';
import dots from 'assets/svg/dots.svg';
import { colors, boxShadows } from 'theme';

import { StyledComment, ImageContainer, StyledRow } from './styled';

const Dropdown = ({ options, top, ...restProps }) => {
  const [open, setOpen] = useState(false);

  const dropdown = useRef(null);

  useEffect(() => {
    const cleanUp = outsideClickHandler(dropdown, () => setOpen(false));

    return cleanUp;
  }, []);

  const getPosition = () => {
    if (top)
      return {
        bottom: '35px',
      };
    return { top: '35px' };
  };

  return (
    <Box
      display="flex"
      justify="end"
      align="start"
      position="relative"
      {...restProps}
    >
      <ImageContainer
        ref={dropdown}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Img src={dots} alt="dots" />
      </ImageContainer>
      {open && (
        <Row position="absolute" right="0" zIndex={999} {...getPosition()}>
          <Column bg={colors.white} shadow={boxShadows.black} borderRadius={10}>
            {options.map(option => (
              <StyledRow
                key={`el-dropdown-${option.id}`}
                padding={8}
                onClick={option.action}
                align="center"
              >
                {option.icon && <Img src={option.icon} alt="icon" mr={12} />}
                <StyledComment
                  color={option.color || colors.bluewood}
                  whiteSpace="nowrap"
                  title={option.label}
                >
                  {option.label}
                </StyledComment>
              </StyledRow>
            ))}
          </Column>
        </Row>
      )}
    </Box>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  top: PropTypes.bool,
};

export default Dropdown;
