import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  editUserRequest,
  editUserSaga,
  makeSelectUserTimeZone,
} from 'global/reducers/auth';
import { useInjectSaga } from 'redux-injectors';

import { TimezoneForm } from 'components/TimezoneForm';

const WrappedTimezoneForm = ({ formatMessage, userTimeZone, editUser }) => {
  useInjectSaga({ key: 'editUser', saga: editUserSaga });

  const handleChange = (timeZone) => {
    editUser({ timeZone });
  };

  return (
    <TimezoneForm
      formatMessage={formatMessage}
      timeZone={userTimeZone}
      onChange={handleChange}
      pr={10}
    />
  );
};

WrappedTimezoneForm.propTypes = {
  formatMessage: PropTypes.func,
  userTimeZone: PropTypes.string,
  editUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userTimeZone: makeSelectUserTimeZone(),
});

const mapDispatchToProps = {
  editUser: editUserRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(WrappedTimezoneForm);
