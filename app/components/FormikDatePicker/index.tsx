import React, { PropsWithChildren } from 'react';
import { useField } from 'formik';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import isNil from 'lodash/isNil';

import { colors } from 'theme';

import { DatePickerWrapper } from 'components/Input/styled';
import Input from 'components/Input';

import FormikControlLayout from '../FormikControlLayout';

export type Props = PropsWithChildren<{
  formikKey: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  datePickerProps?: Partial<ReactDatePickerProps>;
  inputProps?: React.HTMLProps<HTMLButtonElement> & Record<string, unknown>;
}> &
  Record<string, unknown>;

const FormikDatePicker = ({
  formikKey,
  label,
  placeholder,
  disabled,
  children,
  datePickerProps,
  inputProps,
  ...columnStyleProps
}: Props) => {
  const [field, meta, helpers] = useField(formikKey);
  const { error, touched } = meta;
  const { setValue } = helpers;

  const hasError = touched && !isNil(error);

  return (
    <FormikControlLayout
      formikKey={formikKey}
      label={label}
      touched={touched}
      error={error}
      {...columnStyleProps}
    >
      <DatePickerWrapper>
        {/* @ts-ignore */}
        <DatePicker
          {...field}
          onChange={setValue}
          disabled={disabled}
          selected={field.value}
          placeholderText={placeholder ?? 'MM-DD-YYYY'}
          dateFormat="MM-dd-yyyy"
          customInput={
            <Input
              disabled={disabled}
              mx={0}
              padding={12}
              textAlign="left"
              color={disabled ? colors.casper : colors.bluewood}
              hasError={hasError}
              {...inputProps}
            />
          }
          showMonthDropdown
          showYearDropdown
          calendarClassName="schedule-date-picker"
          popperModifiers={{
            preventOverflow: {
              padding: 10,
            },
          }}
          popperProps={{
            positionFixed: true,
          }}
          {...datePickerProps}
        />
      </DatePickerWrapper>
    </FormikControlLayout>
  );
};

export default FormikDatePicker;
