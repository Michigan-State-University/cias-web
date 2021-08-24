import styled from 'styled-components';
import { themeColors, colors } from 'theme';
import { margin, padding } from '../BaseComponentStyles';

const SwitchWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 40px;
  height: 21px;
  ${margin};
  ${padding};
`;

const SwitchInput = styled.input.attrs(({ checked, disabled }) => ({
  type: 'checkbox',
  role: 'switch',
  'aria-checked': checked,
  'aria-disabled': disabled,
}))`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  transition: 0.4s;

  cursor: pointer;
  background-color: ${colors.blueHaze};
  border-radius: 21px;

  ${SwitchInput}:checked + & {
    background-color: ${themeColors.secondary};
  }

  ${SwitchInput}:focus + & {
    box-shadow: 0 0 1px ${themeColors.secondary};
  }

  ${SwitchInput}:disabled + & {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:before {
    position: absolute;
    content: '';
    left: 4px;
    bottom: 4px;

    transition: 0.4s;

    height: 13px;
    width: 13px;
    background-color: white;
    border-radius: 50%;

    ${SwitchInput}:checked + & {
      transform: translateX(18px);
    }
  }
`;

export { SwitchWrapper, SwitchInput, Slider };
