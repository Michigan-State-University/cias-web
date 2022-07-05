import styled from 'styled-components';
import ReactQuill from 'react-quill';

import { colors, borders, fontFamily, themeColors, paddings } from 'theme';

import Input from 'components/Input';

import { margin, layout, border } from '../BaseComponentStyles';

export const QuillStyled = styled(ReactQuill)`
  width: 100%;
  min-height: ${({ autoSize }) => autoSize && 'max-content'};
  height: ${({ autoSize, singleline }) =>
    singleline ? 'auto' : !autoSize && '150px'};
  ${({ focused }) =>
    focused
      ? {
          border: `1px solid ${colors.jungleGreen}`,
          borderRadius: `10px`,
          '.ql-bubble': {
            zIndex: 1000,
          },
        }
      : { border: '1px solid transparent' }}

  .ql-editor {
    font-weight: 400;
    padding: 10px;
    overflow: visible;

    &.ql-blank::before {
      left: 11px;
    }
  }

  .ql-picker-label svg {
    margin-bottom: 15px !important;
  }
  .ql-toolbar {
    width: max-content;
  }
  .ql-container {
    font-size: ${({ defaultFontSize }) =>
      defaultFontSize ? `${defaultFontSize}px` : 'initial'};
    font-family: ${fontFamily};
  }
`;

export const StyledDateInput = styled.button`
  background-color: ${colors.zirkon};
  border-radius: ${borders.borderRadius};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${colors.linkWater};
  &:hover {
    ${({ disabled }) => (disabled ? 'cursor: not-allowed' : 'cursor: pointer')};
  }
  &:focus {
    outline: none;
  }
  ${margin};
  ${layout};
  ${border};
`;

export const DatePickerWrapper = styled.div`
  .schedule-date-picker {
    font-family: ${fontFamily};
    background-color: ${colors.linkWater};
    .react-datepicker__header {
      background-color: ${colors.zirkon};
    }
    .react-datepicker__day--keyboard-selected {
      background-color: ${themeColors.secondary};
    }
    .react-datepicker__day--selected {
      background-color: ${themeColors.secondary};
    }
    .react-datepicker__day:hover {
      color: ${colors.black};
      background-color: ${colors.zirkon};
    }
    .react-datepicker__year-option {
      background-color: ${colors.linkWater};
    }
    .react-datepicker__month-option {
      background-color: ${colors.linkWater};
    }
  }
`;

export const SearchInputStyled = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  ${layout}
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const Sufix = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
  align-items: center;
  justify-content: center;

  span:first-of-type {
    visibility: hidden;
  }

  span:last-of-type {
    white-space: pre;
  }
`;

export const StyledChipsInput = styled.div`
  padding: ${({ isInputFilled }) =>
    isInputFilled ? `8px 6px 3px 6px` : paddings.small};
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${({ isFocused }) =>
    isFocused ? themeColors.primary : themeColors.highlight};
  border-radius: ${borders.borderRadius};
  width: 100%;
  background-color: ${colors.zirkon};
  ${margin};
`;

export const HiddenInput = styled(Input)`
  height: ${({ isInputFilled }) => (isInputFilled ? '31px' : '100%')};
  width: ${({ isInputFilled }) => (isInputFilled ? 'auto' : '100%')};
  border: none;
  outline: none;
  background-color: ${colors.zirkon};
  margin-left: ${({ isInputFilled }) => (isInputFilled ? '2px' : '0')};
  flex: 1;
`;
