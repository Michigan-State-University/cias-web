import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';
import arrowDownSelect from 'assets/svg/arrow-down-select.svg';
import questionMark from 'assets/svg/question-mark.svg';

import useOutsideClick from 'utils/useOutsideClick';
import HeaderContainer from './HeaderContainer';
import ElementsContainer from './ElementsContainer';

const Selector = ({
  options,
  activeOption,
  tooltipContent,
  ElementsComponent,
  HeaderComponent,
  rightPosition,
  setOption,
}) => {
  const selector = useRef(null);
  useOutsideClick(selector, () => setIsActive(false), isActive);

  const selectedOption = activeOption || options[0];
  const [isActive, setIsActive] = useState(false);
  const transform = isActive ? 'rotate(180deg);' : '';
  const transition = 'transform 0.2s;';

  const toggleActive = () => setIsActive(!isActive);

  return (
    <Box position="relative" ref={selector}>
      <Row align="center">
        <HeaderComponent onClick={toggleActive}>
          {selectedOption.label}
        </HeaderComponent>
        {tooltipContent && (
          <Tooltip
            id={`el-tooltip-id-${selectedOption.id}`}
            ml={8}
            icon={questionMark}
            text={tooltipContent}
          />
        )}
        <Img
          src={arrowDownSelect}
          alt="arrow"
          clickable
          ml={8}
          transform={transform}
          transition={transition}
          onClick={toggleActive}
        />
      </Row>
      {isActive && (
        <Row
          position="absolute"
          top="30px"
          right={rightPosition || '0'}
          zIndex={999}
        >
          <ElementsComponent
            options={options}
            selectedOption={selectedOption}
            setOption={setOption}
            toggleActive={toggleActive}
          />
        </Row>
      )}
    </Box>
  );
};

Selector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, label: PropTypes.string }),
  ),
  activeOption: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  }),
  tooltipContent: PropTypes.string,
  HeaderComponent: PropTypes.elementType,
  ElementsComponent: PropTypes.elementType,
  rightPosition: PropTypes.string,
  setOption: PropTypes.func,
};

Selector.defaultProps = {
  HeaderComponent: HeaderContainer,
  ElementsComponent: ElementsContainer,
};
export default Selector;
