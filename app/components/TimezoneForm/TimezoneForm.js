import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  FormikTimezoneSelect,
  getTimezoneLabel,
} from 'components/FormikTimezoneSelect';

const initialValues = (timeZone) => {
  if (!timeZone) return { timeZone: null };
  return {
    timeZone: {
      value: timeZone,
      label: getTimezoneLabel(timeZone),
    },
  };
};

export const TimezoneForm = ({
  formatMessage,
  timeZone,
  onChange,
  disabled,
  ...props
}) => {
  const onSubmit = (values, { setSubmitting }) => {
    const { value } = values.timeZone || {};
    if (onChange && value) onChange(value);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues(timeZone)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <FormikTimezoneSelect
          columnStyleProps={props}
          formikKey="timeZone"
          disabled={disabled}
          submitOnChange
        />
      )}
    </Formik>
  );
};

TimezoneForm.propTypes = {
  formatMessage: PropTypes.func,
  timeZone: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
