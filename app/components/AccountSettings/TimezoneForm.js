import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import dayjs from 'dayjs';

import FormikSelect from 'components/FormikSelect';
import { TIMEZONES } from 'utils/timezones';

import messages from './messages';

const timezoneLabel = (timeZone) =>
  `${timeZone} (UTC ${dayjs().tz(timeZone).format('Z')})`;

const initialValues = (user) => {
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
      TIMEZONES.map((elem) => ({
        value: elem,
        label: timezoneLabel(elem),
      })),
    [TIMEZONES],
  );

  return (
    <Formik initialValues={initialValues(user)} onSubmit={onSubmit}>
      {() => (
        <FormikSelect
          columnStyleProps={{
            pr: 10,
          }}
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
