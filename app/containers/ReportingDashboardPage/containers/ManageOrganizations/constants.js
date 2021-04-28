import { createContext } from 'react';

export const ManageOrganizationsContext = createContext({
  organization: null,
  loaders: {
    fetchOrganization: false,
    editOrganization: false,
    deleteOrganization: false,
  },
  errors: {
    fetchOrganization: null,
    editOrganization: null,
    deleteOrganization: null,
  },
});
