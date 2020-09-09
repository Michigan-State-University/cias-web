import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { colors, borders, fontFamily, themeColors } from 'theme';
import { margin, layout } from '../BaseComponentStyles';

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
  }
  .ql-editor.ql-blank::before {
    left: 11px;
  }
  .ql-picker-label svg {
    margin-bottom: 15px !important;
  }
  .ql-toolbar {
    width: max-content;
  }
  .ql-container {
    font-size: initial;
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
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  ${margin};
  ${layout};
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
  position: relative;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
`;

export const ClearButton = styled.div`
  cursor: pointer;
`;

export const ClearIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 14px;
  height: 15px;
`;
