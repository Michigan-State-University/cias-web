import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

import {
  allCopyModalSagas,
  copyModalReducer,
} from 'global/reducers/copyModalReducer';

import { SessionTypes } from 'models/Session';
import { QuestionDTO, QuestionTypes } from 'models/Question';

import { colors, boxShadows } from 'theme';

import useOutsideClick from 'utils/useOutsideClick';

import Row from 'components/Row';
import Box from 'components/Box';

import VariableView from './Components/VariableView';
import SessionView from './Components/SessionView';
import InterventionView from './Components/InterventionView';

import { VariableChooserContext, VIEWS } from './constants';

interface Props {
  children: JSX.Element;
  disabled: boolean;
  includeAllSessions: boolean;
  includeAllVariables: boolean;
  includeCurrentQuestion: boolean;
  includeCurrentSession: boolean;
  includeNonDigitVariables: boolean;
  interventionId: string;
  isMultiIntervention: boolean;
  isMultiSession: boolean;
  onClick: (variable: string) => void;
  organizationId: string;
  placement: 'left' | 'right';
  questionTypeWhitelist: QuestionTypes[];
  selectedQuestion: QuestionDTO;
  sessionId: string;
  topPosition: string;
  sessionTypesWhiteList: SessionTypes[];
  setIsOpen: (isOpen: boolean) => void;
}

const VariableChooser = ({
  children,
  disabled,
  includeAllSessions,
  includeAllVariables,
  includeCurrentQuestion,
  includeCurrentSession,
  includeNonDigitVariables,
  interventionId: initialInterventionId,
  isMultiIntervention,
  isMultiSession,
  onClick,
  organizationId,
  placement,
  questionTypeWhitelist,
  selectedQuestion,
  sessionId: initialSessionId,
  topPosition,
  sessionTypesWhiteList,
  setIsOpen: propsSetOpen,
}: Props) => {
  const variableChooser = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useOutsideClick(variableChooser, close, isOpen);

  const initialView = useMemo(() => {
    if (isMultiIntervention) return VIEWS.INTERVENTION;

    if (isMultiSession && !includeCurrentSession) return VIEWS.SESSION;

    return VIEWS.VARIABLE;
  }, [isMultiIntervention, isMultiSession, includeCurrentSession]);

  const [currentView, setCurrentView] = useState(initialView);
  const toSessionView = () => setCurrentView(VIEWS.SESSION);
  const toVariableView = () => setCurrentView(VIEWS.VARIABLE);

  const [currentInterventionId, setCurrentInterventionId] = useState(
    initialInterventionId,
  );
  const resetCurrentInterventionId = () =>
    currentInterventionId !== initialInterventionId &&
    setCurrentInterventionId(initialInterventionId);

  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);
  const resetCurrentSessionId = () =>
    currentSessionId !== initialSessionId &&
    setCurrentSessionId(initialSessionId);

  const resetVariableChooser = () => {
    resetCurrentSessionId();
    resetCurrentInterventionId();
    setCurrentView(initialView);
  };

  useLayoutEffect(() => {
    if (isOpen) resetVariableChooser();
    if (propsSetOpen) propsSetOpen(isOpen);
  }, [isOpen]);

  const handleOnVariableClick = useCallback(
    (variable) => {
      onClick(variable);
      close();
    },
    [onClick],
  );

  const handleOnSessionClick = useCallback((sessionId) => {
    setCurrentSessionId(sessionId);
    toVariableView();
  }, []);

  const handleOnInterventionClick = useCallback((interventionId) => {
    setCurrentInterventionId(interventionId);
    toSessionView();
  }, []);

  const displayContent = useCallback(() => {
    if (!isOpen) return null;

    switch (currentView) {
      case VIEWS.VARIABLE:
        return <VariableView onClick={handleOnVariableClick} />;

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
    handleOnVariableClick,
    isOpen,
  ]);

  return (
    <Box position="relative">
      <Box onClick={toggle} disabled={disabled} clickable>
        {children}
      </Box>
      <Box
        ref={variableChooser}
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width="auto"
        top={topPosition}
        {...(isOpen ? { zIndex: 1, [placement]: '0px' } : { display: 'none' })}
      >
        <Row>
          <Box padding={8} filled>
            <VariableChooserContext.Provider
              value={{
                currentInterventionId,
                currentSessionId,
                currentView,
                includeAllSessions,
                includeAllVariables,
                includeCurrentQuestion,
                includeCurrentSession,
                includeNonDigitVariables,
                initialInterventionId,
                initialSessionId,
                isMultiIntervention,
                isMultiSession,
                organizationId,
                questionTypeWhitelist,
                selectedQuestion,
                setCurrentView,
                sessionTypesWhiteList,
              }}
            >
              {displayContent()}
            </VariableChooserContext.Provider>
          </Box>
        </Row>
      </Box>
    </Box>
  );
};

VariableChooser.defaultProps = {
  includeCurrentQuestion: true,
  includeCurrentSession: true,
  placement: 'right',
  sessionTypesWhiteList: [
    SessionTypes.CAT_SESSION,
    SessionTypes.CLASSIC_SESSION,
  ],
  selectedQuestion: {},
} as Partial<Props>;

const reduxInjectors = [
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
];

export default compose(...reduxInjectors, memo)(VariableChooser);
