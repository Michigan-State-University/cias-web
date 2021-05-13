import { createContext } from 'react';

import { initialState } from 'global/reducers/dashboardSections';

export const DashboardSectionsContext = createContext(initialState);
