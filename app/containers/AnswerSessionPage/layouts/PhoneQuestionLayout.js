import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'redux-injectors';

import {
  changePhoneNumberSaga,
  makeSelectUser,
  makeSelectLoaders,
  makeSelectErrors,
  changeErrorStatus,
  editPhoneNumberPreviewRequest,
  makeSelectPhoneNumberPreview,
} from 'global/reducers/auth';
import { previewRegex } from 'global/constants/regex';
import { resetPhoneNumberPreview } from 'global/reducers/auth/actions';

import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import { TimeRanges } from 'components/TimeRanges';
import Column from 'components/Column';

const PhoneQuestionLayout = ({
  formatMessage,
  user,
  phoneNumberPreview,
  editPhoneNumber,
  error,
  loading,
  changeErrorValue,
  onChange,
  required,
  availableTimeRanges,
  answerBody,
}) => {
  const US_PHONE = { iso: 'US', prefix: '+1' };

  useInjectSaga({ key: 'changePhoneNumber', saga: changePhoneNumberSaga });

  const isPreview = previewRegex.test(window.location.href);

  const { timeRanges, ...phoneProps } = answerBody?.value ?? {};

  const phone = {
    ...((isPreview ? phoneNumberPreview : user?.phone) ?? {}),
    ...phoneProps,
  };

  useEffect(() => {
    if (phone && phone.confirmed) onChange({ ...phone, timeRanges });
  }, [phone?.confirmed]);

  const handleChangePhoneNumber = (phoneNumber) => {
    editPhoneNumber(phoneNumber, isPreview);
    if (phoneNumber && phoneNumber.confirmed)
      onChange({ ...phoneNumber, timeRanges });
  };

  const handleTimeRangesChange = (newTimeRanges) => {
    onChange({ ...(phone ?? {}), timeRanges: newTimeRanges });
  };

  return (
    <Column>
      <PhoneNumberForm
        formatMessage={formatMessage}
        phone={phone?.iso ? phone : { ...phone, ...US_PHONE }}
        changePhoneNumber={handleChangePhoneNumber}
        error={error}
        loading={loading}
        changeErrorValue={changeErrorValue}
        disabled={phone?.confirmed}
        required={required}
      />
      {availableTimeRanges && (
        <TimeRanges
          availableTimeRanges={availableTimeRanges}
          selectedTimeRanges={timeRanges}
          onChange={handleTimeRangesChange}
        />
      )}
    </Column>
  );
};

PhoneQuestionLayout.propTypes = {
  formatMessage: PropTypes.func,
  user: PropTypes.object,
  phoneNumberPreview: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  editPhoneNumber: PropTypes.func,
  changeErrorValue: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool.isRequired,
  availableTimeRanges: PropTypes.array,
  answerBody: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  phoneNumberPreview: makeSelectPhoneNumberPreview(),
  loading: makeSelectLoaders('changePhoneNumberLoading'),
  error: makeSelectErrors('changePhoneNumberError'),
});

const mapDispatchToProps = {
  editPhoneNumber: editPhoneNumberPreviewRequest,
  changeErrorValue: changeErrorStatus,
  resetPhoneNumber: resetPhoneNumberPreview,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PhoneQuestionLayout);
