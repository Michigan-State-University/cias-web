import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import FormikSelect from 'components/FormikSelect';
import TIMEZONES from 'utils/timezones';

import messages from './messages';

dayjs.extend(utc);
dayjs.extend(timezone);

const timezoneLabel = timeZone =>
  `${timeZone} (UTC ${dayjs()
    .tz(timeZone)
    .format('Z')})`;

const initialValues = user => {
  const { timeZone } = user;
  return {
    timeZone: {
      value: timeZone,
      label: timezoneLabel(timeZone),
    },
  };
};

const TimezoneForm = ({ formatMessage, user, editUser }) => {
  const onSubmit = ({ timeZone }, { setSubmitting }) => {
    const { value } = timeZone || {};
    if (value) editUser({ timeZone: value });
    setSubmitting(false);
  };

  const timezoneOptions = useMemo(
    () =>
      TIMEZONES.map(elem => ({
        value: elem,
        label: timezoneLabel(elem),
      })),
    [TIMEZONES],
  );

  return (
    <Formik initialValues={initialValues(user)} onSubmit={onSubmit}>
      {() => (
        <FormikSelect
          formikKey="timeZone"
          label={formatMessage(messages.timeZoneLabel)}
          options={timezoneOptions}
        />
      )}
    </Formik>
  );
};

TimezoneForm.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.shape({
    timeZone: PropTypes.string,
  }),
  editUser: PropTypes.func,
};

export default TimezoneForm;
