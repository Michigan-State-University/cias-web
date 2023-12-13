import React, { memo, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { useRoleManager } from 'models/User/RolesManager';

import { isHfhsIntegrationFeatureEnabled } from 'utils/env';

import Tabs from 'components/Tabs';

import {
  CatMhLicenseType,
  Intervention,
  InterventionStatus,
} from 'models/Intervention';
import {
  editInterventionRequest,
  makeSelectCanCurrentUserMakeChanges,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import { colors } from 'theme';

import messages from './messages';
import { CatMhAccessModalUI } from './CatMhAccessModalUI';
import { HfHsAccessModalUI } from './HfHsAccessModalUI';
import { ModalUIData, ThirdPartyToolsAccessFormValues } from './types';
import {
  getTestsLeft,
  mapInterventionToModalData,
  mapModalDataToIntervention,
  schema,
} from './utils';

export type Props = {
  modalState: Intervention;
  closeModal: () => void;
};

const Component = ({ modalState: intervention, closeModal }: Props) => {
  const { formatMessage } = useIntl();
  const { isAdmin } = useRoleManager();

  // redux
  const dispatch = useDispatch();

  // state
  const isEditing = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('editIntervention'),
  );
  const canCurrentUserMakeChanges = useSelector(
    makeSelectCanCurrentUserMakeChanges(),
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

  const onSubmit = (values: ThirdPartyToolsAccessFormValues): void => {
    editIntervention({ ...mapModalDataToIntervention(modalData), ...values });
  };

  const initialValues: ThirdPartyToolsAccessFormValues = useMemo(
    () => ({
      hfhsAccess: intervention.hfhsAccess,
      locationIds: intervention.clinicLocations.map(({ id }) => id),
    }),
    [intervention],
  );

  const canEdit = !isEditing && canCurrentUserMakeChanges;

  return (
    <Formik
      validationSchema={schema(formatMessage)}
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ isValid, dirty, values, handleSubmit }) => {
        const canSave = (!isEqual(initialData, modalData) || dirty) && isValid;
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
            <div label={formatMessage(messages.catMhLabel)} hidden={!isAdmin}>
              <CatMhAccessModalUI
                modalData={modalData}
                canSave={canSave}
                isSaving={isEditing}
                canEdit={canEdit}
                onSave={handleSubmit}
                onAccessChange={onAccessChange}
                onLicenseInformationChange={onLicenseInformationChange}
                onLicenseTypeChange={onLicenseTypeChange}
                onTestNumberChange={onTestNumberChange}
                isDraft={intervention.status === InterventionStatus.DRAFT}
              />
            </div>
            <div
              // @ts-ignore
              label={formatMessage(messages.henryFordLabel)}
              hidden={!isHfhsIntegrationFeatureEnabled}
            >
              <HfHsAccessModalUI
                values={values}
                onSave={handleSubmit}
                canSave={canSave}
                isSaving={isEditing}
                disabled={!canEdit}
                canChangeAccess={isAdmin}
              />
            </div>
          </Tabs>
        );
      }}
    </Formik>
  );
};
export const ThirdPartyToolsAccessModal = memo(Component);
