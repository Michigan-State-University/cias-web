import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HenryFordInitialScreenDTO } from 'models/Question';
import { HfhsPatientData, HfhsPatientDetail } from 'models/HfhsPatient';

import { RootState } from 'global/reducers';

import HenryFordInitialScreenLayout from '../layouts/HenryFordInitialScreenLayout';

import { SharedProps } from '../types';
import { verifyPatientDataRequest } from '../actions';
import {
  makeSelectHfhsPatientDetail,
  makeSelectVerifyPatientDataState,
} from '../selectors';

const HenryFordInitialScreen = ({
  isMobilePreview,
  isPreview,
  saveAnswer,
  disabled,
  continueButtonLoading,
}: SharedProps<HenryFordInitialScreenDTO>) => {
  const dispatch = useDispatch();

  const hfhsPatientDetail = useSelector<RootState, Nullable<HfhsPatientDetail>>(
    makeSelectHfhsPatientDetail(),
  );
  const { loading, error } = useSelector(makeSelectVerifyPatientDataState());

  const patientDetailProvided = Boolean(hfhsPatientDetail);

  const handleSubmitPatientData = (patientData: HfhsPatientData) => {
    if (isPreview || patientDetailProvided) {
      saveAnswer(false);
      return;
    }
    dispatch(verifyPatientDataRequest(patientData));
  };

  return (
    <HenryFordInitialScreenLayout
      forceMobile={isMobilePreview}
      onSubmitPatientData={handleSubmitPatientData}
      verifying={loading || continueButtonLoading}
      verifyingError={error}
      hfhsPatientDetail={hfhsPatientDetail}
      disabled={patientDetailProvided || disabled}
    />
  );
};

export default HenryFordInitialScreen;
