/**
 *
 * FormikCheckbox
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import isNil from 'lodash/isNil';

import { themeColors } from 'theme';

import Checkbox from 'components/Checkbox';
import FormikControlLayout from 'components/FormikControlLayout';

function FormikCheckbox({ formikKey, children }) {
  const [field, meta, helpers] = useField(formikKey);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const hasError = touched && !isNil(error);

  return (
    <FormikControlLayout touched={touched} error={error}>
      <Checkbox
        id={formikKey}
        onChange={() => {
          setTouched(true);
          setValue(!value);
        }}
        mr={10}
        checked={value}
        stroke={hasError && themeColors.warning}
      >
        {children}
      </Checkbox>
    </FormikControlLayout>
  );
}

FormikCheckbox.propTypes = {
  formikKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(FormikCheckbox);
