import React, { memo, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from 'components/Tabs';
import {
  CatMhLicenseType,
  InterventionDto,
  InterventionStatus,
} from 'models/Intervention';
import {
  editInterventionRequest,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import { colors } from 'theme';

import messages from '../messages';
import { CatMhAccessModalUI } from './CatMhAccessModalUI';
import { HfHsAccessModalUI } from './HfHsAccessModalUI';
import { ModalUIData } from './types';
import {
  mapInterventionToModalData,
  mapModalDataToIntervention,
} from './utils';

export type Props = {
  modalState: InterventionDto;
  closeModal: () => void;
};

const Component = ({ modalState: intervention, closeModal }: Props) => {
  const { formatMessage } = useIntl();

  // redux
  const dispatch = useDispatch();

  // state
  const isEditing = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('editIntervention'),
  );

  // actions
  const editIntervention = (newValue: Partial<InterventionDto>) =>
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
    setModalData({ ...modalData, testNumber });
  };

  const onSave = (): void => {
    editIntervention(mapModalDataToIntervention(modalData));
  };

  const onHfHsAccessChange = (hfhsAccess: boolean): void =>
    setModalData({ ...modalData, hfhsAccess });

  const canSave = !isEqual(initialData, modalData);

  return (
    // @ts-ignore
    <Tabs
      mt={24}
      withBottomBorder
      emphasizeActiveLink
      labelStyle={{ color: colors.slateGray }}
      containerProps={{ mb: 0, mt: 40 }}
    >
      {/* @ts-ignore */}
      <div label={formatMessage(messages.catMhLabel)}>
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
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.henryFordLabel)}>
        <HfHsAccessModalUI
          modalData={modalData}
          onAccessChange={onHfHsAccessChange}
          onSave={onSave}
          canSave={canSave}
          isSaving={isEditing}
        />
      </div>
    </Tabs>
  );
};

export const ThirdPartyToolsAccessModal = memo(Component);
