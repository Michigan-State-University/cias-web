import * as Yup from 'yup';
import { createContext } from 'react';

import { emailFormValidationSchema } from 'utils/validators';
import { initialState } from 'global/reducers/organizations/organizationReducer';

export const ManageOrganizationsContext = createContext(initialState);

export const inviteValidationSchema = Yup.object().shape({
  email: emailFormValidationSchema,
});
