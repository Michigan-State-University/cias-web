import React, {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import {
  allCopyModalSagas,
  copyModalReducer,
} from 'global/reducers/copyModalReducer';

import { SessionTypes } from 'models/Session';
import { QuestionDTO, QuestionTypes } from 'models/Question';
import { ReflectableQuestion } from 'models/ReflectableQuestion';

import { boxShadows, colors } from 'theme';

import useOutsideClick from 'utils/useOutsideClick';

import Row from 'components/Row';
import Box from 'components/Box';

import VariableView from './Components/VariableView';
import ReflectableQuestionView from './Components/ReflectableQuestionView';
import SessionView from './Components/SessionView';
import InterventionView from './Components/InterventionView';

import { VariableChooserContext, VIEWS } from './constants';

export enum VariableChooserMode {
  VARIABLE = 'variable',
  REFLECTABLE_QUESTION = 'reflectable-question',
}

export type CommonProps = {
  children: JSX.Element;
  currentInterventionId?: string;
  currentSessionId?: string;
  disabled: boolean;
  includeAllSessions: boolean;
  includeCurrentQuestion?: boolean;
  includeCurrentSession?: boolean;
  initialInterventionId?: string;
  initialSessionId?: string;
  isMultiIntervention: boolean;
  isMultiSession: boolean;
  organizationId?: string;
  placement?: 'left' | 'right';
  topPosition?: string;
  sessionTypesWhiteList?: SessionTypes[];
  setIsOpen: (isOpen: boolean) => void;
  dropdownWidth?: CSSProperties['width'];
};

export type VariableModeProps = {
  mode?: undefined | VariableChooserMode.VARIABLE;
  onClick: (variable: string) => void;
  includeAllVariables: boolean;
  includeNonDigitVariables: boolean;
  questionTypeWhitelist?: QuestionTypes[];
  selectedQuestion?: QuestionDTO | {};
  currentSessionPreviousQuestions?: undefined;
};

export type ReflectableQuestionModeProps = {
  mode: VariableChooserMode.REFLECTABLE_QUESTION;
  onClick: (question: ReflectableQuestion) => void;
  includeAllVariables?: undefined;
  includeNonDigitVariables?: undefined;
  questionTypeWhitelist?: undefined;
  selectedQuestion?: undefined;
  currentSessionPreviousQuestions: QuestionDTO[];
};

export type Props = CommonProps &
  (VariableModeProps | ReflectableQuestionModeProps);

const VariableChooser = ({
  children,
  currentInterventionId,
  currentSessionId,
  disabled,
  includeAllSessions,
  includeAllVariables,
  includeCurrentQuestion = true,
  includeCurrentSession = true,
  includeNonDigitVariables,
  initialInterventionId,
  initialSessionId,
  isMultiIntervention,
  isMultiSession,
  onClick,
  organizationId = '',
  placement = 'right',
  questionTypeWhitelist,
  selectedQuestion = {},
  topPosition,
  sessionTypesWhiteList = [
    SessionTypes.CAT_SESSION,
    SessionTypes.CLASSIC_SESSION,
    SessionTypes.SMS_SESSION,
  ],
  setIsOpen: propsSetOpen,
  mode = VariableChooserMode.VARIABLE,
  dropdownWidth = 'auto',
  currentSessionPreviousQuestions,
}: Props) => {
  useInjectReducer({ key: 'copyModal', reducer: copyModalReducer });
  useInjectSaga({ key: 'copyModal', saga: allCopyModalSagas });

  const variableChooser = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useOutsideClick(variableChooser, close, isOpen);

  const initialView = useMemo(() => {
    if (isMultiIntervention) return VIEWS.INTERVENTION;

    if (isMultiSession && !includeCurrentSession) return VIEWS.SESSION;

    if (mode === VariableChooserMode.REFLECTABLE_QUESTION)
      return VIEWS.REFLECTABLE_QUESTION;

    return VIEWS.VARIABLE;
  }, [isMultiIntervention, isMultiSession, includeCurrentSession]);

  const [currentView, setCurrentView] = useState(initialView);
  const toSessionView = () => setCurrentView(VIEWS.SESSION);
  const toVariableView = () => setCurrentView(VIEWS.VARIABLE);
  const toReflectableQuestionView = () =>
    setCurrentView(VIEWS.REFLECTABLE_QUESTION);

  const [selectedInterventionId, setSelectedInterventionId] = useState(
    initialInterventionId ?? currentInterventionId,
  );

  const resetSelectedInterventionId = () =>
    selectedInterventionId !== initialInterventionId &&
    setSelectedInterventionId(initialInterventionId ?? currentInterventionId);

  useEffect(() => {
    resetSelectedInterventionId();
  }, [initialInterventionId]);

  const [selectedSessionId, setSelectedSessionId] = useState(
    initialSessionId ?? currentSessionId,
  );

  const resetSelectedSessionId = () =>
    selectedSessionId !== initialSessionId &&
    setSelectedSessionId(initialSessionId ?? currentSessionId);

  useEffect(() => {
    resetSelectedSessionId();
  }, [initialSessionId]);

  const resetVariableChooser = () => {
    resetSelectedSessionId();
    resetSelectedInterventionId();
    setCurrentView(initialView);
  };

  useLayoutEffect(() => {
    if (!isOpen) resetVariableChooser();
    if (propsSetOpen) propsSetOpen(isOpen);
  }, [isOpen]);

  const handleOnChoose = useCallback(
    (variable) => {
      onClick(variable);
      close();
    },
    [onClick],
  );

  const handleOnSessionClick = useCallback((sessionId) => {
    setSelectedSessionId(sessionId);

    if (mode === VariableChooserMode.REFLECTABLE_QUESTION) {
      toReflectableQuestionView();
      return;
    }

    toVariableView();
  }, []);

  const handleOnInterventionClick = useCallback((interventionId) => {
    setSelectedInterventionId(interventionId);
    toSessionView();
  }, []);

  const displayContent = useCallback(() => {
    if (!isOpen) return null;

    switch (currentView) {
      case VIEWS.VARIABLE:
        return <VariableView onClick={handleOnChoose} />;

      case VIEWS.REFLECTABLE_QUESTION:
        return <ReflectableQuestionView onClick={handleOnChoose} />;

      case VIEWS.SESSION:
        return <SessionView onClick={handleOnSessionClick} />;

      case VIEWS.INTERVENTION:
        return <InterventionView onClick={handleOnInterventionClick} />;

      default:
        return null;
    }
  }, [
    currentView,
    handleOnInterventionClick,
    handleOnSessionClick,
    handleOnChoose,
    isOpen,
  ]);

  const contextValue = useMemo(
    () => ({
      currentSessionId,
      currentInterventionId,
      selectedInterventionId,
      selectedSessionId,
      currentView,
      includeAllSessions,
      includeAllVariables,
      includeCurrentQuestion,
      includeCurrentSession,
      includeNonDigitVariables,
      isMultiIntervention,
      isMultiSession,
      organizationId,
      questionTypeWhitelist,
      selectedQuestion,
      setCurrentView,
      sessionTypesWhiteList,
      currentSessionPreviousQuestions,
    }),
    [
      currentSessionId,
      currentInterventionId,
      selectedInterventionId,
      selectedSessionId,
      currentView,
      includeAllSessions,
      includeAllVariables,
      includeCurrentQuestion,
      includeCurrentSession,
      includeNonDigitVariables,
      isMultiIntervention,
      isMultiSession,
      organizationId,
      questionTypeWhitelist,
      selectedQuestion,
      setCurrentView,
      sessionTypesWhiteList,
      currentSessionPreviousQuestions,
    ],
  );

  return (
    <Box position="relative" ref={variableChooser}>
      <Box onClick={toggle} disabled={disabled} clickable>
        {children}
      </Box>
      <Box
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width={dropdownWidth}
        top={topPosition}
        {...(isOpen ? { zIndex: 1, [placement]: '0px' } : { display: 'none' })}
      >
        <Row>
          <Box padding={8} filled maxWidth="100%">
            <VariableChooserContext.Provider value={contextValue}>
              {displayContent()}
            </VariableChooserContext.Provider>
          </Box>
        </Row>
      </Box>
    </Box>
  );
};

export default memo(VariableChooser);
