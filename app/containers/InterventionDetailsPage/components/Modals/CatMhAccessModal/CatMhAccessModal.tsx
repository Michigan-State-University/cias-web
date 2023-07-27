import React, { memo, useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';

import {
  CatMhLicenseType,
  Intervention,
  InterventionStatus,
} from 'models/Intervention';
import {
  editInterventionRequest,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import { CatMhAccessModalUI } from './CatMhAccessModalUI';
import { ModalUIData } from './types';
import {
  getTestsLeft,
  mapInterventionToModalData,
  mapModalDataToIntervention,
} from './utils';

type Props = {
  modalState: Intervention;
  closeModal: () => void;
};

const Component = ({ modalState: intervention, closeModal }: Props) => {
  // redux
  const dispatch = useDispatch();

  // state
  const isEditing = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('editIntervention'),
  );

  // actions
  const editIntervention = (newValue: Partial<Intervention>) =>
    dispatch(editInterventionRequest({ id: intervention.id, ...newValue }));

  const initialData = useMemo(
    () => mapInterventionToModalData(intervention),
    [intervention],
  );
  const [modalData, setModalData] = useState<ModalUIData>({
    ...initialData,
  });

  useEffect(() => closeModal, []);

  const onAccessChange = (isAccessRevoked: boolean): void => {
    setModalData({ ...modalData, isAccessRevoked });
  };

  const onLicenseInformationChange = (
    organizationId: number,
    applicationId: string,
  ): void => {
    setModalData({ ...modalData, applicationId, organizationId });
  };

  const onLicenseTypeChange = (licenseType: CatMhLicenseType): void => {
    setModalData({ ...modalData, licenseType });
  };

  const onTestNumberChange = (testNumber: number): void => {
    const testsLeft = getTestsLeft(
      testNumber,
      intervention.createdCatMhSessionCount,
    );
    setModalData({ ...modalData, testNumber, testsLeft });
  };

  const onSave = (): void => {
    editIntervention(mapModalDataToIntervention(modalData));
  };

  const canSave = !isEqual(initialData, modalData);

  return (
    <CatMhAccessModalUI
      modalData={modalData}
      canSave={canSave}
      isSaving={isEditing}
      canEdit={!isEditing}
      onSave={onSave}
      onAccessChange={onAccessChange}
      onLicenseInformationChange={onLicenseInformationChange}
      onLicenseTypeChange={onLicenseTypeChange}
      onTestNumberChange={onTestNumberChange}
      isDraft={intervention.status === InterventionStatus.DRAFT}
    />
  );
};

export const CatMhAccessModal = memo(Component);
