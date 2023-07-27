import { Intervention } from 'models/Intervention';

import { ModalUIData } from './types';

export const getTestsLeft = (
  catMhPool: Nullable<number>,
  createdCatMhSessionCount: Nullable<number>,
) => Math.max(0, (catMhPool ?? 0) - (createdCatMhSessionCount ?? 0));

export const mapInterventionToModalData = (
  intervention: Intervention,
): ModalUIData => {
  const {
    catMhPool,
    licenseType,
    catMhApplicationId,
    catMhOrganizationId,
    isAccessRevoked,
    createdCatMhSessionCount,
  } = intervention;

  return {
    testNumber: catMhPool ?? 0,
    testsLeft: getTestsLeft(catMhPool, createdCatMhSessionCount),
    licenseType,
    applicationId: catMhApplicationId ?? '',
    organizationId: catMhOrganizationId ?? undefined,
    isAccessRevoked,
  };
};

export const mapModalDataToIntervention = (
  modalData: ModalUIData,
): Partial<Intervention> => {
  const {
    testNumber,
    licenseType,
    applicationId,
    organizationId,
    isAccessRevoked,
  } = modalData;

  return {
    catMhPool: testNumber ?? 0,
    licenseType,
    catMhApplicationId: applicationId,
    catMhOrganizationId: organizationId,
    isAccessRevoked,
  };
};
