import { Intervention, ClinicLocation } from 'models/Intervention';
import { ApiDataCollection } from 'models/Api';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { SelectOption } from 'components/Select/types';

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
    hfhsAccess,
    clinicLocations,
  } = intervention;

  return {
    testNumber: catMhPool ?? 0,
    testsLeft: getTestsLeft(catMhPool, createdCatMhSessionCount),
    licenseType,
    applicationId: catMhApplicationId ?? '',
    organizationId: catMhOrganizationId ?? undefined,
    isAccessRevoked,
    hfhsAccess,
    locationIds: clinicLocations.map(({ id }) => id),
  };
};

export const mapModalDataToIntervention = (
  modalData: ModalUIData,
): Partial<Intervention> & { locationIds: string[] } => {
  const {
    testNumber,
    licenseType,
    applicationId,
    organizationId,
    isAccessRevoked,
    hfhsAccess,
    locationIds,
  } = modalData;

  return {
    catMhPool: testNumber ?? 0,
    licenseType,
    catMhApplicationId: applicationId,
    catMhOrganizationId: organizationId,
    isAccessRevoked,
    hfhsAccess,
    locationIds,
  };
};

export const clinicLocationsDataParser = (
  data: ApiDataCollection<ClinicLocation>,
): ClinicLocation[] => jsonApiToArray(data, 'clinicLocation');

export const clinicLocationsOptionsFormatter = ({
  id,
  name,
}: ClinicLocation): SelectOption<string> => ({
  value: id,
  label: name,
});
