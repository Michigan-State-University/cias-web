import styled from 'styled-components';
import ReactQuill from 'react-quill';
import Color from 'color';

import { colors, borders, fontFamily, themeColors } from 'theme';

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
  background-color: ${({ bg }) => (bg ? `${bg}` : `${colors.zirkon}`)};
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
  display: flex;
  align-items: center;
  ${layout}
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const Adornment = styled.div`
  text-align: center;
  color: ${Color(colors.bluewood).alpha(0.5).toString()};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  cursor: text;
  ${margin};
  position: absolute;
  right: 0;
  max-width: 75%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
