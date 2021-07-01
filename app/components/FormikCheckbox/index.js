/**
 *
 * FormikCheckbox
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import Checkbox from 'components/Checkbox';
import Box from 'components/Box';
import { themeColors } from 'theme';
import { ErrorText, StyledLabel } from './styled';

function FormikCheckbox({ formikKey, children }) {
  const [field, meta, helpers] = useField(formikKey);
  const { value } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const hasError = Boolean(touched && error);

  return (
    <>
      <Box mb={5} display="flex" align="center">
        <Checkbox
          id={formikKey}
          onClick={() => {
            setValue(!value);
            setTouched(true);
          }}
          mr={10}
          checked={value}
          stroke={hasError && themeColors.warning}
        />
        <StyledLabel htmlFor={formikKey}>{children}</StyledLabel>
      </Box>
      {hasError && <ErrorText>{error}</ErrorText>}
    </>
  );
}

FormikCheckbox.propTypes = {
  formikKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(FormikCheckbox);
