import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HenryFordInitialScreenDTO } from 'models/Question';
import { HfhsPatientData, HfhsPatientDetail } from 'models/HfhsPatient';

import { RootState } from 'global/reducers';

import HenryFordInitialScreenLayout from '../layouts/HenryFordInitialScreenLayout';

import { SharedProps } from '../types';
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

  const [showPatientDataDisplay, setShowPatientDataDisplay] = useState(false);

  // Show display when patient detail is loaded
  useEffect(() => {
    if (hfhsPatientDetail) {
      setShowPatientDataDisplay(true);
    }
  }, [hfhsPatientDetail]);

  const patientDetailProvided = Boolean(hfhsPatientDetail);

  const handleSubmitPatientData = (patientData: HfhsPatientData) => {
    if (isPreview || patientDetailProvided) {
      saveAnswer(false);
      return;
    }
    dispatch(verifyPatientDataRequest(patientData));
  };

  const handleQRCodeScan = (decodedString: string) => {
    if (isPreview) {
      saveAnswer(false);
      return;
    }
    dispatch(verifyQRCodeRequest(decodedString));
  };

  const handleTogglePatientDataDisplay = () => {
    setShowPatientDataDisplay(!showPatientDataDisplay);
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
      onTogglePatientDataDisplay={handleTogglePatientDataDisplay}
      showPatientDataDisplay={showPatientDataDisplay}
    />
  );
};

export default HenryFordInitialScreen;
