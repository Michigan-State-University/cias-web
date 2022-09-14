import { InterventionDto } from 'models/Intervention';

import { ModalUIData } from './types';

export const mapInterventionToModalData = (
  intervention: InterventionDto,
): ModalUIData => {
  const {
    catMhPool,
    licenseType,
    catMhApplicationId,
    catMhOrganizationId,
    isAccessRevoked,
    createdCatMhSessionCount,
    hfhsAccess,
  } = intervention;

  return {
    testNumber: catMhPool ?? 0,
    currentTestNumber: catMhPool - createdCatMhSessionCount ?? 0,
    licenseType,
    applicationId: catMhApplicationId ?? '',
    organizationId: catMhOrganizationId ?? undefined,
    isAccessRevoked,
    hfhsAccess,
  };
};

export const mapModalDataToIntervention = (
  modalData: ModalUIData,
): Partial<InterventionDto> => {
  const {
    testNumber,
    licenseType,
    applicationId,
    organizationId,
    isAccessRevoked,
    hfhsAccess,
  } = modalData;

  return {
    catMhPool: testNumber ?? 0,
    licenseType,
    catMhApplicationId: applicationId,
    catMhOrganizationId: organizationId,
    isAccessRevoked,
    hfhsAccess,
  };
};
