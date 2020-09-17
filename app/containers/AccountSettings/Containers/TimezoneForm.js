import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Formik } from 'formik';
import { createStructuredSelector } from 'reselect';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  editUserRequest,
  editUserSaga,
  makeSelectUser,
} from 'global/reducers/auth';
import { useInjectSaga } from 'utils/injectSaga';

import FormikSelect from 'components/FormikSelect';
import TIMEZONES from 'utils/timezones';
import messages from '../messages';

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
  useInjectSaga({ key: 'editUser', saga: editUserSaga });

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

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(TimezoneForm);
