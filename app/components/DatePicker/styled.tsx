// @ts-ignore
import styled from 'styled-components';
import Color from 'color';

import { colors, fontFamily, themeColors } from 'theme';

// @ts-ignore
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

      &__time-list-item {
        &:hover {
          color: ${colors.white};
          background-color: ${Color(colors.orchid)
            .alpha(0.7)
            .toString()} !important;
        }

        &--selected {
          background-color: ${colors.orchid} !important;
        }
      }
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`;
