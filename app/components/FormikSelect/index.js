/**
 *
 * FormikSelect
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Text from 'components/Text';
import Column from 'components/Column';

import Select from 'components/Select';
import { ErrorText } from './styled';

function FormikSelect({
  formikKey,
  label,
  options,
  columnStyleProps,
  inputProps,
}) {
  const { submitForm, validateForm } = useFormikContext();
  const [field, meta, form] = useField(formikKey);
  const { value } = field;
  const { setValue } = form;
  const { error, touched } = meta;
  const hasError = touched && error;

  const onChange = async e => {
    await validateForm();
    setValue(e);
    await submitForm();
  };

  return (
    <Column {...columnStyleProps}>
      <Text mb={5} width="fit-content">
        {label}
      </Text>
      <Select
        mb={3}
        data-testid="select"
        selectProps={{
          options,
          value,
          onChange,
          ...inputProps,
        }}
      />
      {hasError && <ErrorText>{error.value.toString()}</ErrorText>}
    </Column>
  );
}

FormikSelect.propTypes = {
  formikKey: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  options: PropTypes.array,
  columnStyleProps: PropTypes.object,
};

export default memo(FormikSelect);
