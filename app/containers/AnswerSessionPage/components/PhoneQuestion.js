import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { clientTimeZone } from 'utils/timezones';

import {
  changePhoneNumberSaga,
  editPhoneNumberPreviewRequest,
  makeSelectErrors,
  makeSelectLoaders,
  makeSelectPhoneNumberPreview,
  makeSelectUser,
} from 'global/reducers/auth';
import { previewRegex } from 'global/constants';

import { PhoneQuestionLayout } from 'components/PhoneQuestionLayout';

const PhoneQuestion = ({
  question,
  answerBody: answerData,
  selectAnswer,
  isMobilePreview,
}) => {
  const dispatch = useDispatch();

  useInjectSaga({ key: 'changePhoneNumber', saga: changePhoneNumberSaga });

  const phoneNumberPreview = useSelector(makeSelectPhoneNumberPreview());
  const user = useSelector(makeSelectUser());
  const phoneError = useSelector(makeSelectErrors('changePhoneNumberError'));
  const phoneLoading = useSelector(
    makeSelectLoaders('changePhoneNumberLoading'),
  );

  const {
    body: {
      variable: { name },
    },
    settings: { required },
    time_ranges: availableTimeRanges,
  } = question;

  const { timeRanges, timezone, ...phoneProps } = answerData?.[0]?.value ?? {};

  const phone = {
    ...((isPreview ? phoneNumberPreview : user?.phone) ?? {}),
    ...phoneProps,
  };

  const saveAnswer = (changes) => {
    selectAnswer([
      {
        var: name,
        value: { timeRanges, timezone, ...phone, ...changes } ?? {},
      },
    ]);
  };

  const isPreview = previewRegex.test(window.location.href);

  const handlePhoneNumberChange = (newPhone) => {
    dispatch(editPhoneNumberPreviewRequest(newPhone, isPreview));
    if (newPhone && newPhone.confirmed) {
      saveAnswer(newPhone);
    }
  };

  const handleTimezoneChange = (newTimezone) => {
    saveAnswer({ timezone: newTimezone });
  };

  const handleTimeRangesChange = (newTimeRanges) => {
    saveAnswer({ timeRanges: newTimeRanges });
  };

  useEffect(() => {
    if (phone?.confirmed) {
      saveAnswer(phone);
    }
  }, [phone?.confirmed]);

  useEffect(() => {
    if (!timezone) {
      saveAnswer({ timezone: clientTimeZone });
    }
  }, [timezone]);

  return (
    <PhoneQuestionLayout
      required={required}
      phone={phone}
      timezone={timezone}
      availableTimeRanges={availableTimeRanges}
      selectedTimeRanges={timeRanges}
      forceMobileLayout={isMobilePreview}
      phoneError={phoneError}
      phoneLoading={phoneLoading}
      onPhoneNumberChange={handlePhoneNumberChange}
      onTimezoneChange={handleTimezoneChange}
      onTimeRangesChange={handleTimeRangesChange}
    />
  );
};

PhoneQuestion.propTypes = {
  question: PropTypes.object.isRequired,
  selectAnswer: PropTypes.func,
  answerBody: PropTypes.any,
  isMobilePreview: PropTypes.bool,
};

export default PhoneQuestion;
