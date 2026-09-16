import { IntlShape } from 'react-intl/src/types';
import * as Yup from 'yup';

import { Intervention, ClinicLocation } from 'models/Intervention';
import { ApiDataCollection } from 'models/Api';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import { SelectOption } from 'components/Select/types';

import { ModalUIData } from './types';
import messages from './messages';

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

export const schema = (formatMessage: IntlShape['formatMessage']) =>
  Yup.object().shape({
    hfhsAccess: Yup.boolean(),
    locationIds: Yup.array().when('hfhsAccess', {
      is: (hfhsAccess: boolean) => hfhsAccess,
      then: Yup.array().min(
        1,
        formatMessage(messages.selectClinicLocationsError),
      ),
    }),
  });
