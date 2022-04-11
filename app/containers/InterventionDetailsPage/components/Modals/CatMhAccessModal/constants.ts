import * as Yup from 'yup';

import {
  requiredValidationSchema,
  numericValidationSchema,
} from 'utils/validators';

export const ACCESS_LABEL_ID = 'id-access';

export const LICENSE_LIMITED_LABEL_ID = 'id-license-type-limited';
export const LICENSE_UNLIMITED_LABEL_ID = 'id-license-type-unlimited';
export const TEST_NUMBER_LABEL_ID = 'id-test-count';

export const APPLICATION_ID_FORMIK_KEY = 'applicationId';
export const ORGANIZATION_ID_FORMIK_KEY = 'organizationId';
export const TEST_NUMBER_FORMIK_KEY = 'testNumber';

export const modalValidationSchema = Yup.object().shape({
  [APPLICATION_ID_FORMIK_KEY]: requiredValidationSchema,
  [ORGANIZATION_ID_FORMIK_KEY]: numericValidationSchema.concat(
    requiredValidationSchema,
  ),
  [TEST_NUMBER_FORMIK_KEY]: numericValidationSchema.concat(
    requiredValidationSchema,
  ),
});
