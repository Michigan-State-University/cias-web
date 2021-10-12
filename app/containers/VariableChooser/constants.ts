import { createContext } from 'react';

import { QuestionTypes, QuestionDTO } from 'models/Question';
import { SessionTypes } from 'models/Session';

export enum VIEWS {
  VARIABLE = 'VARIABLE',
  SESSION = 'SESSION',
  INTERVENTION = 'INTERVENTION',
}

interface ContextType {
  currentInterventionId: string;
  currentSessionId: string;
  currentView: string;
  includeAllSessions: boolean;
  includeAllVariables: boolean;
  includeCurrentQuestion: boolean;
  includeCurrentSession: boolean;
  includeNonDigitVariables: boolean;
  initialInterventionId: string;
  initialSessionId: string;
  isMultiIntervention: boolean;
  isMultiSession: boolean;
  organizationId: string;
  questionTypeWhitelist: QuestionTypes[];
  selectedQuestion: QuestionDTO | {};
  setCurrentView: (view: VIEWS) => void;
  sessionTypesWhiteList: SessionTypes[];
}

export const VariableChooserContext = createContext<ContextType>({
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
  selectedQuestion: {},
  setCurrentView: (_) => _,
  sessionTypesWhiteList: [],
});
