import React from 'react';
import { useField, useFormikContext } from 'formik';
import isNil from 'lodash/isNil';
import { Props as ReactSelectProps } from 'react-select';
import { MessageDescriptor } from 'react-intl';

import FormikControlLayout, {
  Props as FormikControlLayoutProps,
} from 'components/FormikControlLayout';
import ApiSelect from 'components/Select/ApiSelect';
import { SelectOption } from 'components/Select/types';

export type Props<ApiResponseData, ParsedDataItem, OptionValue> = {
  formikKey: string;
  label: string;
  disabled?: boolean;
  submitOnChange?: boolean;
  columnStyleProps?: Partial<FormikControlLayoutProps>;
  selectProps?: Partial<ReactSelectProps<SelectOption<OptionValue>, boolean>>;
  url: string;
  dataParser: (apiResponseData: ApiResponseData) => ParsedDataItem[];
  optionsFormatter: (dataItem: ParsedDataItem) => SelectOption<OptionValue>;
  defaultFetchErrorMessage?: MessageDescriptor;
} & Record<string, unknown>;

export const FormikApiSelect = <ApiResponseData, ParsedDataItem, OptionValue>({
  formikKey,
  label,
  columnStyleProps,
  selectProps,
  disabled,
  submitOnChange,
  ...props
}: Props<ApiResponseData, ParsedDataItem, OptionValue>) => {
  const { submitForm, validateForm } = useFormikContext();
  const [{ value, onChange, ...fieldProps }, meta, helpers] =
    useField(formikKey);
  const { error, touched } = meta;
  const { setValue } = helpers;
  const hasError = touched && !isNil(error);

  const handleChange = async (e: any) => {
    if (submitOnChange) {
      await validateForm();
      setValue(e);
      await submitForm();
    } else {
      setValue(e);
    }
  };

  return (
    <FormikControlLayout
      formikKey={formikKey}
      label={label}
      touched={touched}
      error={error}
      {...columnStyleProps}
    >
      {/* @ts-ignore */}
      <ApiSelect
        isOptionDisabled={disabled}
        disabled={disabled}
        selectedValue={value}
        onSelectedValueChange={handleChange}
        selectProps={{
          isDisabled: disabled,
          inputId: formikKey,
          hasError,
          ...fieldProps,
          ...selectProps,
        }}
        {...props}
      />
    </FormikControlLayout>
  );
};
