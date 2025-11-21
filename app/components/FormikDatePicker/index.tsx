import React, { PropsWithChildren } from 'react';
import { useField, useFormikContext } from 'formik';
import isNil from 'lodash/isNil';
import { useIntl } from 'react-intl';
import { DatePickerProps } from 'react-datepicker';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { DateInput, Props as DateInputProps } from 'components/Input/DateInput';
import { LocalizedDatePicker } from 'components/DatePicker';
import FormikControlLayout from 'components/FormikControlLayout';

import messages from './messages';

export type Props = PropsWithChildren<{
  formikKey: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  datePickerProps?: Partial<DatePickerProps>;
  inputProps?: DateInputProps;
  submitOnChange?: boolean;
  selectTime?: boolean;
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
  submitOnChange,
  selectTime,
  ...columnStyleProps
}: Props) => {
  const { formatMessage } = useIntl();
  const { submitForm } = useFormikContext();

  const [field, meta, helpers] = useField(formikKey);
  const { error, touched } = meta;
  const { setValue } = helpers;

  const hasError = touched && !isNil(error);

  // Filter out incompatible props for react-datepicker v7
  const {
    showMonthYearDropdown,
    showMonthDropdown,
    showYearDropdown,
    selectsRange,
    ...filteredDatePickerProps
  } = datePickerProps || {};

  useDidUpdateEffect(() => {
    if (submitOnChange) {
      submitForm();
    }
  }, [field.value]);

  return (
    <FormikControlLayout
      formikKey={formikKey}
      label={label}
      touched={touched}
      error={error}
      {...columnStyleProps}
    >
      <LocalizedDatePicker
        name={field.name}
        onBlur={field.onBlur}
        onChange={(value: Date | null) => setValue(value)}
        disabled={disabled}
        selected={field.value}
        placeholderText={
          placeholder ?? (selectTime ? 'MM/DD/YYYY, --:--' : 'MM/DD/YYYY')
        }
        dateFormat={selectTime ? 'MM/dd/yyyy, p' : 'MM/dd/yyyy'}
        customInput={
          <DateInput disabled={disabled} hasError={hasError} {...inputProps} />
        }
        calendarClassName="schedule-date-picker"
        timeCaption={formatMessage(messages.timeCaption)}
        showTimeSelect={selectTime}
        strictParsing
        {...(filteredDatePickerProps as any)}
      />
    </FormikControlLayout>
  );
};

export default FormikDatePicker;
