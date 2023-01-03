import { createContext } from 'react';

import { QuestionTypes, QuestionDTO } from 'models/Question';
import { SessionTypes } from 'models/Session';

export enum VIEWS {
  VARIABLE = 'VARIABLE',
  SESSION = 'SESSION',
  INTERVENTION = 'INTERVENTION',
  REFLECTABLE_QUESTION = 'REFLECTABLE_QUESTION',
}

interface ContextType {
  currentInterventionId?: string;
  currentSessionId?: string;
  selectedSessionId?: string;
  selectedInterventionId?: string;
  currentView: string;
  includeAllSessions: boolean;
  includeAllVariables?: boolean;
  includeCurrentQuestion: boolean;
  includeCurrentSession: boolean;
  includeNonDigitVariables?: boolean;
  isMultiIntervention: boolean;
  isMultiSession: boolean;
  organizationId: string;
  questionTypeWhitelist?: QuestionTypes[];
  selectedQuestion: QuestionDTO | {};
  setCurrentView: (view: VIEWS) => void;
  sessionTypesWhiteList: SessionTypes[];
  currentSessionPreviousQuestions?: QuestionDTO[];
}

export const VariableChooserContext = createContext<ContextType>({
  currentInterventionId: '',
  currentSessionId: '',
  selectedInterventionId: '',
  selectedSessionId: '',
  currentView: '',
  includeAllSessions: false,
  includeAllVariables: false,
  includeCurrentQuestion: false,
  includeCurrentSession: false,
  includeNonDigitVariables: false,
  isMultiIntervention: false,
  isMultiSession: false,
  organizationId: '',
  questionTypeWhitelist: [],
  selectedQuestion: {},
  setCurrentView: (_) => _,
  sessionTypesWhiteList: [],
  currentSessionPreviousQuestions: [],
});

export const InterventionViewContext = createContext<{
  onClick: (id: string) => void;
}>({
  onClick: () => {},
});

export const batchSize = 20;
