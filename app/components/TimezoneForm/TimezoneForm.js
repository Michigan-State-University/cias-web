import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import dayjs from 'dayjs';

import { TIMEZONES } from 'utils/timezones';

import FormikSelect from 'components/FormikSelect';

import messages from './messages';

const timezoneLabel = (timeZone) =>
  `${timeZone} (UTC ${dayjs().tz(timeZone).format('Z')})`;

const initialValues = (timeZone) => {
  if (!timeZone) return { timeZone: null };
  return {
    timeZone: {
      value: timeZone,
      label: timezoneLabel(timeZone),
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

  const timezoneOptions = useMemo(
    () =>
      TIMEZONES.map((elem) => ({
        value: elem,
        label: timezoneLabel(elem),
      })),
    [TIMEZONES],
  );

  return (
    <Formik
      initialValues={initialValues(timeZone)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {() => (
        <FormikSelect
          columnStyleProps={props}
          formikKey="timeZone"
          label={formatMessage(messages.timeZoneLabel)}
          options={timezoneOptions}
          disabled={disabled}
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
