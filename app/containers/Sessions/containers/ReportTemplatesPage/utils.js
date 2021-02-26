import { createContext } from 'react';
import { initialState } from 'global/reducers/reportTemplates';

export const ReportTemplatesContext = createContext(initialState);
