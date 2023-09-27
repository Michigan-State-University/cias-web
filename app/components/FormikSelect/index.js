/**
 *
 * FormikSelect
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import isNil from 'lodash/isNil';

import Select from 'components/Select';
import FormikControlLayout from 'components/FormikControlLayout';

function FormikSelect({
  formikKey,
  label,
  options,
  columnStyleProps,
  inputProps,
  disabled,
  submitOnChange,
}) {
  const { submitForm, validateForm } = useFormikContext();
  const [field, meta, helpers] = useField(formikKey);
  const { error, touched } = meta;
  const { setValue } = helpers;
  const hasError = touched && !isNil(error);

  const onChange = async (e) => {
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
      <Select
        isOptionDisabled={disabled}
        data-testid="select"
        disabled={disabled}
        selectProps={{
          options,
          isDisabled: disabled,
          inputId: formikKey,
          hasError,
          ...field,
          onChange,
          ...inputProps,
        }}
      />
    </FormikControlLayout>
  );
}

FormikSelect.propTypes = {
  formikKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  options: PropTypes.array,
  columnStyleProps: PropTypes.object,
  disabled: PropTypes.bool,
  submitOnChange: PropTypes.bool,
};

export default memo(FormikSelect);
