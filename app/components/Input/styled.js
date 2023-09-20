import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import Color from 'color';

import { colors, borders, fontFamily, themeColors, paddings } from 'theme';

import Input from 'components/Input';
import { margin, layout } from 'components/BaseComponentStyles';

import { INPUT_PADDING } from './constants';
import { AdornmentType } from './types';

export const QuillStyled = styled(ReactQuill)`
  width: 100%;
  min-height: ${({ autoSize }) => autoSize && 'max-content'};
  height: ${({ autoSize, singleline }) =>
    singleline ? 'auto' : !autoSize && '150px'};

  ${({ blurTransparentBorder }) =>
    blurTransparentBorder
      ? { border: '1px solid transparent' }
      : {
          ...borders,
          borderColor: themeColors.highlight,
        }}
  ${({ focused, blurTransparentBorder }) =>
    focused && {
      border: `1px solid ${colors.jungleGreen}`,
      // ternary to prevent modifying existing inputs
      borderRadius: blurTransparentBorder ? `10px` : borders.borderRadius,
      '.ql-bubble': {
        zIndex: 1000,
      },
    }}
  ${({ readOnly }) => (readOnly ? 'cursor: not-allowed' : '')};

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

  .ql-container * {
    ${({ readOnly }) => (readOnly ? 'cursor: not-allowed' : '')};
  }
`;

export const DatePickerWrapper = styled.div`
  .schedule-date-picker {
    font-family: ${fontFamily};
    background-color: ${colors.linkWater};

    .react-datepicker {
      &__header {
        background-color: ${colors.zirkon};
      }

      &__day {
        color: ${themeColors.text};

        &:hover {
          color: ${colors.white};
          background-color: ${Color(colors.orchid).alpha(0.7).toString()};
        }

        &--keyboard-selected {
          background-color: ${colors.orchid};
        }

        &--in-range,
        &--in-selecting-range {
          color: ${themeColors.text};
          background-color: ${Color(colors.orchid).alpha(0.1).toString()};
        }

        &--selected:not(&--in-selecting-range),
        &--range-start:not(&--in-selecting-range),
        &--range-end:not(&--in-selecting-range),
        &--selecting-range-start,
        &--selecting-range-end {
          color: ${colors.white};
          background-color: ${colors.orchid};
        }
      }

      &__year-option {
        background-color: ${colors.linkWater};
      }

      &__month-option {
        background-color: ${colors.linkWater};
      }
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
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

export const Adornment = styled.div`
  text-align: center;
  color: ${Color(colors.bluewood).alpha(0.5).toString()};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  cursor: text;
  position: absolute;
  ${({ type }) =>
    type === AdornmentType.SUFFIX
      ? css`
          right: ${borders.borderWidth};
          padding-right: ${INPUT_PADDING}px;
        `
      : css`
          left: ${borders.borderWidth};
          padding-left: ${INPUT_PADDING}px;
        `}
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

const getChipsInputPadding = (isInputFilled, compact) => {
  if (isInputFilled) {
    if (compact) return `5px 0 0 0`;
    return `8px 6px 3px 6px`;
  }
  if (compact) return '0';
  return paddings.small;
};

export const StyledChipsInput = styled.div`
  border-style: ${borders.borderStyle};
  border-width: ${borders.borderWidth};
  border-color: ${({ isFocused }) =>
    isFocused ? themeColors.primary : themeColors.highlight};
  border-radius: ${borders.borderRadius};
  width: 100%;
  background-color: ${({ transparent }) =>
    transparent ? 'inherit' : colors.zirkon};
  ${margin};
  padding: ${({ isInputFilled, compact }) =>
    getChipsInputPadding(isInputFilled, compact)};
`;

export const HiddenInput = styled(Input)`
  height: ${({ isInputFilled }) => (isInputFilled ? '31px' : '100%')};
  width: ${({ isInputFilled }) => (isInputFilled ? 'auto' : '100%')};
  border: none;
  outline: none;
  background-color: ${({ transparent }) =>
    transparent ? 'inherit' : colors.zirkon};
  margin-left: ${({ isInputFilled }) => (isInputFilled ? '2px' : '0')};
  flex: 1;
`;
