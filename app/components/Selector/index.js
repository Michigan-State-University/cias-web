import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'components/Tooltip';
import Box from 'components/Box';
import Row from 'components/Row';
import questionMark from 'assets/svg/question-mark.svg';

import useOutsideClick from 'utils/useOutsideClick';
import ToggleArrow from 'components/ToggleArrow';
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
  selectOptionPlaceholder,
  disabled,
  ariaLabel,
}) => {
  const selector = useRef(null);

  const selectedOption = activeOption || { label: selectOptionPlaceholder };
  const [isActive, setIsActive] = useState(false);

  useOutsideClick(selector, () => setIsActive(false), isActive);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <Box position="relative" ref={selector}>
      <Row align="center" role="button">
        <HeaderComponent disabled={disabled} onClick={toggleActive}>
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
        {!disabled && (
          <ToggleArrow
            facingUp={isActive}
            clickable
            ml={8}
            onClick={toggleActive}
          />
        )}
      </Row>
      {isActive && (
        <Row
          position="absolute"
          top="30px"
          right={rightPosition || '0'}
          zIndex={999}
          role="listbox"
          aria-label={ariaLabel}
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
  selectOptionPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

Selector.defaultProps = {
  HeaderComponent: HeaderContainer,
  ElementsComponent: ElementsContainer,
};
export default Selector;
