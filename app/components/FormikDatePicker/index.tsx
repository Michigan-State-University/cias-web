import React, { PropsWithChildren } from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import isNil from 'lodash/isNil';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { DatePickerWrapper } from 'components/Input/styled';
import Input from 'components/Input';

import FormikControlLayout from '../FormikControlLayout';

import messages from './messages';

export type Props = PropsWithChildren<{
  formikKey: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  datePickerProps?: Partial<ReactDatePickerProps>;
  inputProps?: React.HTMLProps<HTMLButtonElement> & Record<string, unknown>;
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
      <DatePickerWrapper>
        {/* @ts-ignore */}
        <DatePicker
          {...field}
          onChange={setValue}
          disabled={disabled}
          selected={field.value}
          placeholderText={
            placeholder ?? (selectTime ? 'MM-DD-YYYY, --:--' : 'MM-DD-YYYY')
          }
          dateFormat={selectTime ? 'MM-dd-yyyy, p' : 'MM-dd-yyyy'}
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
          timeCaption={formatMessage(messages.timeCaption)}
          showTimeSelect={selectTime}
          {...datePickerProps}
        />
      </DatePickerWrapper>
    </FormikControlLayout>
  );
};

export default FormikDatePicker;
