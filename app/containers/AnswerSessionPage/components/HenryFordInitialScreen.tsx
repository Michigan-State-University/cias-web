/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HenryFordInitialScreenDTO } from 'models/Question';
import { HfhsPatientData, HfhsPatientDetail } from 'models/HfhsPatient';

import { RootState } from 'global/reducers';

import HenryFordInitialScreenLayout from '../layouts/HenryFordInitialScreenLayout';

import { SharedProps } from '../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { verifyPatientDataRequest, verifyQRCodeRequest } from '../actions';
import {
  makeSelectHfhsPatientDetail,
  makeSelectVerifyPatientDataState,
  makeSelectVerifyQRCodeState,
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
  const { loading: qrVerifying, error: qrVerifyingError } = useSelector(
    makeSelectVerifyQRCodeState(),
  );

  const patientDetailProvided = Boolean(hfhsPatientDetail);

  const handleSubmitPatientData = (patientData: HfhsPatientData) => {
    if (isPreview || patientDetailProvided) {
      saveAnswer(false);
      return;
    }
    dispatch(verifyPatientDataRequest(patientData));
  };

  const handleQRCodeScan = (decodedString: string) => {
    // if (isPreview || patientDetailProvided) {
    //   saveAnswer(false);
    //   return;
    // }
    // dispatch(verifyQRCodeRequest(decodedString));
    console.log('Here is decoded string from QR scan:', decodedString);
  };

  return (
    <HenryFordInitialScreenLayout
      forceMobile={isMobilePreview}
      onSubmitPatientData={handleSubmitPatientData}
      onQRCodeScan={handleQRCodeScan}
      verifying={loading || continueButtonLoading}
      verifyingError={error}
      qrVerifying={qrVerifying}
      qrVerifyingError={qrVerifyingError}
      hfhsPatientDetail={hfhsPatientDetail}
      disabled={patientDetailProvided || disabled}
    />
  );
};

export default HenryFordInitialScreen;
