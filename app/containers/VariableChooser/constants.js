import { createContext } from 'react';

export const VIEWS = {
  VARIABLE: 'VARIABLE',
  SESSION: 'SESSION',
  INTERVENTION: 'INTERVENTION',
};

export const VariableChooserContext = createContext({
  currentInterventionId: '',
  currentSessionId: '',
  currentView: '',
  includeAllSessions: false,
  includeAllVariables: false,
  includeCurrentQuestion: false,
  includeCurrentSession: false,
  includeNonDigitVariables: false,
  initialInterventionId: '',
  initialSessionId: '',
  isMultiIntervention: false,
  isMultiSession: false,
  organizationId: '',
  questionTypeWhitelist: [],
  selectedQuestion: '',
  setCurrentView: undefined,
});
